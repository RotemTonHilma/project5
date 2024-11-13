import { useEffect, useState } from "react";
import Comment from "./Comment";

export default function CommentSection({ postId }) {

    const [commentsArr, setCommentsArr] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://localhost:3000/comments?postId=${postId}`);
                if (!response.ok) throw Error("unable to get comments");
                setCommentsArr(await response.json());
            }
            catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <section>
            {commentsArr.map(comment => {
                return <Comment key={comment.id} comment={comment} />
            })}
        </section>
    );

}