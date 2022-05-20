import { useState } from "react";
const Blogposts = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            let posts = await fetch('/api/v1/blog', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${localStorage.getItem('jwt')}`
                }

            });
            let data = await res.json();
            setPosts(data);
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <button on onClick={getPosts}>get posts</button>
            {posts.map(p => {
                return (
                    <h1 key={p._id}>{title}</h1>
                )
            })}
        </div>
    )
}

export default Blogposts;