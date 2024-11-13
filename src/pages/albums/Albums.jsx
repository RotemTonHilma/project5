import { LoggedUserContext } from "../../context/LoggedUserContext";
import { useContext, useState } from "react";
import { useFetch } from "../../custom-hooks/useFetch";
import { searchArr } from "../../utils";
import Album from "./Album";

export default function Albums() {
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const { data: userAlbums, isLoading } = useFetch(`http://localhost:3000/albums?userId=${loggedUser.id}`);
    const [albumFilters, setAlbumFilters] = useState({ id: "", title: "" });

    let filteredAlbums = searchArr(userAlbums, albumFilters);

    function handleAlbumFilterChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setAlbumFilters((prev) => ({ ...prev, [name]: value }));
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
