import axios from "axios";
import { renderPostCard, renderPostCardAdmin } from "./render";

export async function deleteElement(id) {
    try {
        const {data} = await axios.get('http://localhost:3000/posts');
        const index = data.findIndex(s => s.id === id);
        if (index !== -1) {
            const url = 'http://localhost:3000';
            const endpoint = 'posts';  
            const response = await axios.delete(`${url}/${endpoint}/${id}`);
            console.log(`Card with ID ${id} removed ✅`)
            renderPostCard();
            renderPostCardAdmin();
        }
    } catch (error) {
        console.error("Delete error ‼️:", error);
    }
}