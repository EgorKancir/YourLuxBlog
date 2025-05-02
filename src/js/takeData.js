import { createPost } from "./addPost";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = form.elements.title.value;
    const author = form.elements.author.value;
    const mainContent = form.elements.mainContent.value;

    const postData = {
        title,
        author,
        text: mainContent
    }
    createPost(postData);
});


