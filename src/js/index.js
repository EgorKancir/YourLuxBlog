import debounce from "debounce";

import "./components/comments";
import { viewPhotoFunc } from "./components/viewPhoto";
import { formCleaner } from "./components/formCleaner";
import { createPost } from "./components/post";
import { renderPostCard, renderPostCardAdmin } from "./components/render";
import { editElement } from "./components/update";
import { deleteElement } from "./components/delete";
import { renderPostPage } from "./components/renderPostPage";

export const postForm = document.getElementById("post-form");
export const postFormEdit = document.getElementById("post-form--edit");
export const postsGallery = document.getElementById("postsGallery");
export const postsGalleryAdmin = document.getElementById("postsGallery--admin");
export const addButton = document.querySelector(".post-form__button--add");
export const saveButton = document.querySelector(".post-form__button--save");
export const postPageContent = document.querySelector(".post-page__content");
export const postPageGallery = document.getElementById("post__gallery--id");

document.addEventListener("DOMContentLoaded", () => {
        if (postsGallery) {
            renderPostCard(); 
        }
        if (postsGalleryAdmin) {
            renderPostCardAdmin();
        }
        viewPhotoFunc();
}); 

// Post

if (postForm) {
    postForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const randomSeed = Math.random().toString(36).substring(2, 10);
        const avatarUrl = `https://api.dicebear.com/7.x/adventurer/png?seed=${randomSeed}`;

        const title = postForm.elements.post_title.value;
        const author = postForm.elements.post_author.value;
        const authorAvatar = avatarUrl;
        const text = postForm.elements.post_text.value;
        let cover = postForm.elements.post_cover.value;
        let imagesUrl = postForm.elements.post_image_url.value.split(',').map(skill => skill.trim());
        if (cover.length === 0) {
            cover = "https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
        }
        if (imagesUrl.length === 1 && imagesUrl[0] === "") {
            imagesUrl = [
                "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
                "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load", 
                "https://images.pexels.com/photos/13344137/pexels-photo-13344137.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
            ];
        }
        const postData = {
            title,
            author,
            authorAvatar,
            text,
            cover,
            imagesUrl,
            date: new Date().toDateString(),
            commentsNumber: 0,
            postComments: []
    };
        createPost(postData);
        formCleaner(postForm);
        alert("The post is published 👌🏻");
    });
}

// ADMIN

if (postsGalleryAdmin) {
    postsGalleryAdmin.addEventListener('click', (event) => {
        const editButton = event.target.closest('.post-card__btn-edit--admin');
        const deleteBtn = event.target.closest('.post-card__btn-delete--admin');
        const visitBtn = event.target.closest('.post-card__btn-visit--admin');
    
        if (editButton) {
            editElement(editButton.id);
            postFormEdit.classList.add('active');
            postForm.classList.add('disable');
        } else if (deleteBtn) {
            deleteElement(deleteBtn.id);
        } else if (visitBtn) {
            localStorage.removeItem("selectedPostId");
            const id = visitBtn.id;
            console.log("ID картки:", visitBtn.id);
            localStorage.setItem("selectedPostId", id);
        }
    });    
}

// Post Page

if (postsGallery) {
    postsGallery.addEventListener("click", (event) => {
        const card = event.target.closest(".post-card");
        if (card) {
            localStorage.removeItem("selectedPostId");
            const id = card.dataset.id;
            console.log("ID картки:", card.dataset.id);
            localStorage.setItem("selectedPostId", id);
        } else {
        console.warn("Elehement #postsGallery not found ‼️!");
        }
    });
}

if (postPageContent) {
    const postId = localStorage.getItem("selectedPostId");
    if (postId) {
        renderPostPage(postId);
    } else {
        console.warn("ID post not found in localStorage");
    }
}

// Search

const searchInput = document.getElementById("search-input");

if (searchInput) {
    searchInput.addEventListener("input", debounce(() => {
        const inputValue = searchInput.value;
        renderPostCard(inputValue)
    }, 300));    
}


