const { default: axios } = require("axios");
const debounce = require("debounce");


const postForm = document.getElementById("post-form");
const postsGallery = document.getElementById("postsGallery");
const postsGalleryAdmin = document.getElementById("postsGallery--admin");
const addButton = document.querySelector(".post-form__button--add");
const saveButton = document.querySelector(".post-form__button--save");

document.addEventListener("DOMContentLoaded", () => {
    renderPostCard();
    renderPostCardAdmin();
});


// Cleaner

function formCleaner() {
    postForm.reset();
}

if (postForm) {
    postForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const randomSeed = Math.random().toString(36).substring(2, 10);
        const avatarUrl = `https://api.dicebear.com/7.x/adventurer/png?seed=${randomSeed}`;

        const title =   postForm.elements.post_title.value;
        const author = postForm.elements.post_author.value;
        const authorAvatar = avatarUrl;
        const text = postForm.elements.post_text.value;
        let cover = postForm.elements.post_cover.value;
        let imagesUrl = postForm.elements.post_image_url.value.split(',').map(skill => skill.trim());
        if (cover.length === 0) {
            cover = "https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
        }
        if (imagesUrl.length <= 1) {
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
            date: new Date().toDateString()
        }
        createPost(postData);
        formCleaner();
        alert("The post is published 👌🏻");
    });
}

// Post

async function createPost(data) {
    try {
        const newPost = await axios.post('http://localhost:3000/posts', data);
        console.log(`Нова стаття додана: ${data.title}`);
        renderPostCard();
        renderPostCardAdmin();
    } catch (error) {
        console.error("Помилка створення поста:", error);
    }
}

// Render

async function renderPostCard(word) {
    const source = document.getElementById("post-card__template").innerHTML.trim();
    const template = Handlebars.compile(source);
    try {
            const {data} = await axios.get('http://localhost:3000/posts');      
            if (!word) {
                postsGallery.innerHTML = data.map(post => template(post)).join('');
            } else {
                const searchStatus = data.filter((element => {
                    return element.text.toLowerCase().includes(word.toLowerCase());
                }));
                postsGallery.innerHTML = searchStatus.map(post => template(post)).join('');
    }
        } catch (error) {
            console.error("Помилка рендеру:", error);
    }
}

// Render Admin

if (document.getElementById("post-card__template--admin")) {
    async function renderPostCardAdmin() {
        const source = document.getElementById("post-card__template--admin").innerHTML.trim();
        const template = Handlebars.compile(source);
        try {
            const {data} = await axios.get('http://localhost:3000/posts');          
            postsGalleryAdmin.innerHTML =  data.map(post => template(post)).join('');
        } catch (error) {
            console.error("Помилка рендеру:", error);
        }
    }
} else {
    console.log("Елемента Gallery-Admin__template немає на сторінці");
}


// Update

async function editElement(id) {
    try {
        const {data} = await axios.get('http://localhost:3000/posts');
        const post = data.find(p => p.id === id);

        if (!post) {
            console.error(`Post з ID ${id} не знайдений`);
            return;
        }

        document.getElementById('post_title').value = post.title;
        document.getElementById('post_author').value = post.author;
        document.getElementById('post_text').value = post.text;
        document.getElementById('post_cover').value = post.cover;
        document.getElementById('post_image_url').value = post.imagesUrl;
        

        saveButton.addEventListener('click', async function() {
            const index = data.findIndex(p => p.id === id);
            const url = 'http://localhost:3000';
            const endpoint = 'posts';
            let newPost = {
                id: id,
                title:  document.getElementById('post_title').value,
                author: document.getElementById('post_author').value,
                text:  document.getElementById('post_text').value,
                cover:  document.getElementById('post_cover').value,
                imagesUrl:  document.getElementById('post_image_url').value.split(',').map(skill => skill.trim()),
                date: new Date().toDateString()
            };
            if (index !== -1) {
                try {
                    const response = await axios.put(`${url}/${endpoint}/${id}`, newPost);
                    console.log('Оновлено:', response.data);
                    renderPostCard();
                    renderPostCardAdmin()
                } catch (error) {
                    console.error("Не вдалося оновити студента:", error);
                }
            }
            saveButton.classList.remove('active');
            addButton.classList.remove('disable');
            postForm.classList.remove('active');
            formCleaner();
        });
    } catch (error) {
        console.error("Помилка редагування:", error);
    }
}


// DELETE
async function deleteElement(id) {
    try {
        const {data} = await axios.get('http://localhost:3000/posts');
        const index = data.findIndex(s => s.id === id);
        if (index !== -1) {
            const url = 'http://localhost:3000';
            const endpoint = 'posts';  
            const response = await axios.delete(`${url}/${endpoint}/${id}`);
            console.log(`Студент з ID ${id} видалений`)
            renderPostCard();
            renderPostCardAdmin();
        }
    } catch (error) {
        console.error("Помилка видалення:", error);
    }
}

////////////

if (postsGalleryAdmin) {
    postsGalleryAdmin.addEventListener('click', (event) => {
        const editButton = event.target.closest('.post-card__btn-edit--admin');
        const deleteBtn = event.target.closest('.post-card__btn-delete--admin');
    
        if (editButton) {
            editElement(editButton.id);
            saveButton.classList.add('active');
            addButton.classList.add('disable');
            postForm.classList.add('active');
        } else if (deleteBtn) {
            deleteElement(deleteBtn.id);
        }
    });    
}

// Post Page

const mainPostPage = document.querySelector(".main-post-page");

if (postsGallery) {
    postsGallery.addEventListener("click", (event) => {
        const card = event.target.closest(".post-card");
        if (card) {
            localStorage.removeItem("selectedPostId");
            const id = card.dataset.id;
            console.log("ID картки:", card.dataset.id);
            localStorage.setItem("selectedPostId", id);
        } else {
        console.warn("Елемент #postsGallery не знайдено!");
        }
    });
}

async function renderPostPage(id) {
    mainPostPage.innerHTML = " ";
    const sourceEl = document.getElementById("post-page__template");
    if (!sourceEl) {
        console.log("Елемента шаблону немає на сторінці");
        return;
    }

    const source = sourceEl.innerHTML.trim();
    const template = Handlebars.compile(source);

    try {
        const { data } = await axios.get('http://localhost:3000/posts');
        const post = data.find(element => element.id === id);
        if (!post) {
            mainPostPage.innerHTML = `<h3 class="main-post-page__error-text">Пост не знайдено 😞</h3>`;
            return;
        }
        const html = template(post);
        mainPostPage.innerHTML = html;
    } catch (error) {
        console.error("Помилка рендеру:", error);
        mainPostPage.innerHTML = `<h3 class="main-post-page__error-text">Сталася помилка при завантаженні поста 😳</h3>`;
    }
}

if (mainPostPage) {
    const postId = localStorage.getItem("selectedPostId");
    if (postId) {
        renderPostPage(postId);
    } else {
        console.warn("ID поста не знайдено в localStorage");
    }
}

// Search

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", debounce(() => {
    const inputValue = searchInput.value;
    renderPostCard(inputValue)
    
}, 300));