import { LoggedUserContext } from "../../context/LoggedUserContext";
import { useContext, useState } from "react";
import { useFetch } from "../../custom-hooks/useFetch";
import { searchArr, chooseNextId, addItem, fetchGet } from "../../utils";
import Post from "./Post";

export default function Posts() {
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const { data: userPosts, isLoading, setData: setUserPosts } = useFetch(`http://localhost:3000/posts?userId=${loggedUser.id}`);
    const [postFilters, setPostFilters] = useState({ id: "", title: "" });
    const [showPostForm, setShowPostForm] = useState(false);
    const [newPost, setNewPost] = useState({});

    let filteredPosts = searchArr(userPosts, postFilters);

    function handlePostFilterChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setPostFilters((prev) => ({ ...prev, [name]: value }));
    }

    function handleNewPostChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setNewPost((prev) => ({ ...prev, [name]: value }));
    }

    // function removePost(postId){

    // }

    function toggleShowPostForm(e) {
        setShowPostForm(prev => !prev);
    }

    async function addPost(e) {
        e.preventDefault();
        if (!newPost.title || !newPost.body) return;

        const post = { ...newPost, userId: loggedUser.id }

        const nextId = chooseNextId(await fetchGet("http://localhost:3000/posts"));
        const addPostResponse = await addItem("http://localhost:3000/posts", post, nextId);
        if (!addPostResponse) return;
        setUserPosts(await fetchGet(`http://localhost:3000/posts?userId=${loggedUser.id}`));
    }

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
            <div>
                <button onClick={toggleShowPostForm}>Add a post</button>
                {showPostForm &&
                    <form onSubmit={addPost}>
                        <label>Title:
                            <input
                                type="text"
                                name="title"
                                value={newPost.title || ""}
                                onChange={handleNewPostChange}
                            />
                        </label>
                        <br />
                        <label>Body:
                            <input
                                type="text"
                                name="body"
                                value={newPost.body || ""}
                                onChange={handleNewPostChange}
                            />
                        </label>
                        <br />
                        <input type="submit" />
                    </form>
                }
            </div>
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
