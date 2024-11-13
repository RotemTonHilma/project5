import { useLocation } from "react-router-dom";
import { useFetch } from "../../custom-hooks/useFetch";
import { useState } from "react";
import "../../index.css";


export default function Photos() {
    const location = useLocation();
    const { state } = location;
    const { albumId } = state;

    const { data: photos, isLoading } = useFetch(`http://localhost:3000/photos?albumId=${albumId}`);
    const [amountShowing, setAmountShowing] = useState(5);

    function handleShowMorePhotos(e) {
        e.preventDefault();
        if (amountShowing >= photos.length) return;
        setAmountShowing(prev => {
            return prev + 5;
        });
    }

    return (
        <>
            <h1>Album {albumId}</h1>
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