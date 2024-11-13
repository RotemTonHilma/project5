import { LoggedUserContext } from "../../context/LoggedUserContext";
import { useContext, useState } from "react";
import { useFetch } from "../../custom-hooks/useFetch";
import { searchArr } from "../../utils";
import Post from "./Post";

export default function Posts() {
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const { data: userPosts, isLoading } = useFetch(`http://localhost:3000/posts?userId=${loggedUser.id}`);
    const [postFilters, setPostFilters] = useState({ id: "", title: "" });

    let filteredPosts = searchArr(userPosts, postFilters);

    function handlePostFilterChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setPostFilters((prev) => ({ ...prev, [name]: value }));
    }

    // function removePost(postId){

    // }

    return (
        <>
            <h1>Posts</h1>
            {!isLoading &&
                <div>
                    <p>Search Posts</p>
                    <label>Search by ID
                        <input
                            type="text"
                            name="id"
                            onChange={handlePostFilterChange}
                            value={postFilters.id || ""} />
                    </label>
                    <br />
                    <label>Search by Title
                        <input
                            type="text"
                            name="title"
                            onChange={handlePostFilterChange}
                            value={postFilters.title || ""} />
                    </label>
                </div>
            }
            {!isLoading &&
                searchArr(userPosts, postFilters).map((post) => {
                    return <Post
                        key={post.id}
                        post={post}
                    />
                })
            }
        </>


    );
}
