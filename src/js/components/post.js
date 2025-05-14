import axios from "axios";
import { renderPostCard, renderPostCardAdmin } from "./render";

export async function createPost(data) {
    try {
        const newPost = await axios.post('http://localhost:3000/posts', data);
        console.log(`New Article Added ✅: ${data.title}`);
        renderPostCard();
        renderPostCardAdmin();
    } catch (error) {
        console.error("Error creation of post ‼️:", error);
    }
}