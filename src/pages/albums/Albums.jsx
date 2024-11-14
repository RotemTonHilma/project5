import { LoggedUserContext } from "../../context/LoggedUserContext";
import { useContext, useState } from "react";
import { useFetch } from "../../custom-hooks/useFetch";
import { searchArr, fetchGet } from "../../utils";
import Album from "./Album";
import { updateDataBase, chooseNextId } from "../../utils/utils";

export default function Albums() {
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const { data: userAlbums, isLoading, setData: setUserAlbums } = useFetch(`http://localhost:3000/albums?userId=${loggedUser.id}`);
    const [albumFilters, setAlbumFilters] = useState({ id: "", title: "" });
    const [showAlbumForm, setShowAlbumForm] = useState(false);
    const [newAlbum, setNewAlbum] = useState({});


    let filteredAlbums = searchArr(userAlbums, albumFilters);

    function handleAlbumFilterChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setAlbumFilters((prev) => ({ ...prev, [name]: value }));
    }

    function handleNewAlbumChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setNewAlbum((prev) => ({ ...prev, [name]: value }));
    }

    function toggleShowAlbumForm(e) {
        setShowAlbumForm(prev => !prev);
    }

    async function addAlbum(e) {
        e.preventDefault();
        if (!newAlbum.title) return;

        const nextId = chooseNextId(await fetchGet("http://localhost:3000/albums"));

        const album = { ...newAlbum, userId: loggedUser.id, id: nextId }
        await updateDataBase("http://localhost:3000/albums", { method: "POST", body: album, headers: { "Content-Type": "application/json" } })
        setUserAlbums(await fetchGet(`http://localhost:3000/albums?userId=${loggedUser.id}`));
    }

    return (
        <>
            <h1>Albums</h1>
            {!isLoading &&
                <div>
                    <p>Search Albums</p>
                    <label>Search by ID
                        <input
                            type="text"
                            name="id"
                            onChange={handleAlbumFilterChange}
                            value={albumFilters.id || ""} />
                    </label>
                    <br />
                    <label>Search by Title
                        <input
                            type="text"
                            name="title"
                            onChange={handleAlbumFilterChange}
                            value={albumFilters.title || ""} />
                    </label>
                </div>
            }

            <div>
                <button onClick={toggleShowAlbumForm}>Add an album</button>
                {showAlbumForm &&
                    <form onSubmit={addAlbum}>
                        <label>Title:
                            <input
                                type="text"
                                name="title"
                                value={newAlbum.title || ""}
                                onChange={handleNewAlbumChange}
                            />
                        </label>
                        <br />
                        <input type="submit" />
                    </form>
                }
            </div>

            {!isLoading &&
                searchArr(userAlbums, albumFilters).map((album) => {
                    return <Album
                        key={album.id}
                        album={album}
                    />
                })
            }
        </>
    );
}
