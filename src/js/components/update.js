import axios from "axios";
import { formCleaner } from "./formCleaner";
import { postForm, postFormEdit } from "../index";
import { renderPostCard, renderPostCardAdmin } from "./render";

export async function editElement(id) {
    try {
        const {data} = await axios.get('http://localhost:3000/posts');
        const post = data.find(p => p.id === id);

        if (!post) {
            console.error(`Post with ID ${id} not found ❌!`);
            return;
        }

        document.getElementById('post_title--edit').value = post.title;
        document.getElementById('post_author--edit').value = post.author;
        document.getElementById('post_text--edit').value = post.text;
        document.getElementById('post_cover--edit').value = post.cover;
        document.getElementById('post_image_url--edit').value = post.imagesUrl;
        const commentsNumber = post.commentsNumber;
        const postComments = post.postComments;
        
        postFormEdit.addEventListener('submit', async function(event) {
            event.preventDefault();
            const index = data.findIndex(p => p.id === id);
            const url = 'http://localhost:3000';
            const endpoint = 'posts';
            let newPost = {
                id: id,
                title:  document.getElementById('post_title--edit').value,
                author: document.getElementById('post_author--edit').value,
                text:  document.getElementById('post_text--edit').value,
                cover:  document.getElementById('post_cover--edit').value,
                imagesUrl:  document.getElementById('post_image_url--edit').value.split(',').map(skill => skill.trim()),
                date: new Date().toDateString(),
                commentsNumber,
                postComments
            };
            if (index !== -1) {
                try {
                    const response = await axios.put(`${url}/${endpoint}/${id}`, newPost);
                    console.log('Updated ✅:', response.data);
                    renderPostCard();
                    renderPostCardAdmin()
                } catch (error) {
                    console.error("Failed to update the card ‼️:", error);
                }
            }
            postFormEdit.classList.remove('active');
            postForm.classList.remove('disable');
            formCleaner(postFormEdit);
            alert("The post is edited 🔥!");
        });
    } catch (error) {
        console.error("Edit error ‼️:", error);
    }
}