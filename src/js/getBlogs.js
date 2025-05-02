import axios from "axios";

export async function getBlog() {
    try {
        const { data } = await axios.get("http://localhost:3000/blogs");
        console.log(data);
    } catch (error) {
        console.error(error);
        
    }
}
