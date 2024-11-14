import { useLocation } from "react-router-dom";
import { useFetch } from "../../custom-hooks/useFetch";
import { useState } from "react";
import "../../index.css";
import { updateDataBase, chooseNextId } from "../../utils/utils";
import { fetchGet } from "../../utils";

export default function Photos() {
    const location = useLocation();
    const { state } = location;
    const { albumId } = state;

    const { data: photos, isLoading, setData: setPhotos } = useFetch(`http://localhost:3000/photos?albumId=${albumId}`);
    const [amountShowing, setAmountShowing] = useState(5);
    const [showPhotoForm, setShowPhotoForm] = useState(false);
    const [newPhoto, setNewPhoto] = useState({});


    function handleShowMorePhotos(e) {
        e.preventDefault();
        if (amountShowing >= photos.length) return;
        setAmountShowing(prev => {
            return prev + 5;
        });
    }

    function handleNewPhotoChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setNewPhoto((prev) => ({ ...prev, [name]: value }));
    }

    function toggleShowPhotoForm(e) {
        setShowPhotoForm(prev => !prev);
    }

    async function addPhoto(e) {
        e.preventDefault();
        if (!newPhoto.title || !newPhoto.url || !newPhoto.thumbnailUrl) return;

        const nextId = chooseNextId(await fetchGet("http://localhost:3000/photos"));

        const photo = { ...newPhoto, albumId: albumId, id: nextId }
        await updateDataBase("http://localhost:3000/photos", { method: "POST", body: photo, headers: { "Content-Type": "application/json" } })
        setPhotos(await fetchGet(`http://localhost:3000/photos?albumId=${albumId.id}`));
    }

    return (
        <>
            <h1>Album {albumId}</h1>

            <div>
                <button onClick={toggleShowPhotoForm}>Add a Photo</button>
                {showPhotoForm &&
                    <form onSubmit={addPhoto}>
                        <label>Title:
                            <input
                                type="text"
                                name="title"
                                value={newPhoto.title || ""}
                                onChange={handleNewPhotoChange}
                            />
                        </label>
                        <br />
                        <label>URL:
                            <input
                                type="text"
                                name="url"
                                value={newPhoto.url || ""}
                                onChange={handleNewPhotoChange}
                            />
                        </label>
                        <br />
                        <label>Thumbnail URL:
                            <input
                                type="text"
                                name="thumbnailUrl"
                                value={newPhoto.thumbnailUrl || ""}
                                onChange={handleNewPhotoChange}
                            />
                        </label>
                        <br />
                        <input type="submit" />
                    </form>
                }
            </div>

            <div className="photosContainer">
                {!isLoading &&
                    photos.map((photo, idx) => {
                        return idx <= amountShowing - 1 ?
                            <img src={photo.thumbnailUrl}
                                key={photo.id} />
                            : null
                    })
                }
            </div>


            {amountShowing < photos.length && <button onClick={handleShowMorePhotos}>Show More</button>}
        </>
    );
}