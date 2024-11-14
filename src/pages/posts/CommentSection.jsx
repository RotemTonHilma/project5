import { useState } from "react";
import Comment from "./Comment";
import { useFetch } from "../../custom-hooks/useFetch";
import { useContext } from "react";
import { LoggedUserContext } from "../../context/LoggedUserContext";
import { chooseNextId, updateDataBase } from "../../utils/utils";
import { fetchGet } from "../../utils";

export default function CommentSection({ postId }) {
    const { data: commentsArr, isLoading, setData: setCommentsArr } = useFetch(`http://localhost:3000/comments?postId=${postId}`);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [newComment, setNewComment] = useState({});
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);

    function handleNewCommentChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setNewComment((prev) => ({ ...prev, [name]: value }));
    }

    function toggleShowCommentForm(e) {
        setShowCommentForm((prev) => !prev);
    }

    async function addComment(e) {
        e.preventDefault();
        if (!newComment.name || !newComment.body) return;

        const nextId = chooseNextId(await fetchGet("http://localhost:3000/comments"));

        const comment = { ...newComment, postId: postId, id: nextId, email: loggedUser.email };
        await updateDataBase("http://localhost:3000/comments", { method: "POST", body: comment, headers: { "Content-Type": "application/json" } });
        setCommentsArr(await fetchGet(`http://localhost:3000/comments?postId=${postId}`));
        setShowCommentForm(false);
        setNewComment({});
    }

    return (
        <section>
            <div>
                <button onClick={toggleShowCommentForm}>Add a Comment</button>
                {showCommentForm && (
                    <form onSubmit={addComment}>
                        <label>
                            Title:
                            <input type="text" name="name" value={newComment.name || ""} onChange={handleNewCommentChange} />
                        </label>
                        <br />
                        <label>
                            Body:
                            <input type="text" name="body" value={newComment.body || ""} onChange={handleNewCommentChange} />
                        </label>
                        <br />
                        <input type="submit" />
                    </form>
                )}
            </div>
            {!isLoading &&
                commentsArr.map((comment) => {
                    return <Comment key={comment.id} comment={comment} />;
                })}
        </section>
    );
}
