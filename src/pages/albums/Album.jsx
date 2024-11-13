import { Link } from "react-router-dom";
import { useState } from "react";

export default function Album({ album }) {

    return (
        <div>
            <Link
                to={`${album.id}/photos`}
                state={{ albumId: album.id }}>
                {album.id}. {album.title}
            </Link>
        </div>


    );
}
