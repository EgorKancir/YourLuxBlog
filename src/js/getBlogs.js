import axios from "axios";
import { makehtml } from "./makeHtml";

export async function getBlog() {
    try {
        const { data } = await axios.get("http://localhost:3000/blogs");
        makehtml(data);
    } catch (error) {
        console.error(error);
        
    }
}

getBlog()