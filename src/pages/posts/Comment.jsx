

export default function Comment({ comment }) {

    return (
        <div style={{ border: "1px solid gray" }}>
            <p style={{ fontWeight: "bold" }}>{comment.name}</p>
            <p>{comment.body}</p>
        </div>
    );
}