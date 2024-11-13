import { useState, useEffect } from "react";
import CommentSection from "./CommentSection";

export default function Post({ post }) {

    const [showMore, setShowMore] = useState(false);
    const [showComments, setShowComments] = useState(false);

    function toggleSeeMore() {
        setShowMore(prev => !prev);
    }

    function toggleShowComments() {
        setShowComments(prev => !prev);
    }
    return (
        <p>
            <p>{post.id}. {post.title}</p>
            <button onClick={toggleSeeMore}>See More</button>
            {showMore && <p>{post.body} </p>}
            <button onClick={toggleShowComments}>Show Comments</button>
            {showComments && <CommentSection postId={post.id} />}
        </p>);
}