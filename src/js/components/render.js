import Handlebars from "handlebars";
import axios from "axios";
import { postsGallery, postsGalleryAdmin } from "../index"

const templateSource = `
        <a class="post-card" data-id="{{id}}" href="./postPage.html">
            <img class="post-card__cover" src="{{cover}}" alt="img">
            <h3 class="post-card__title">{{title}}</h3>
            <div class="post-card__author-info">
                <img class="post-card__author-image" src="{{authorAvatar}}" alt="{{author}}">
                <h4 class="post-card__author-name">{{author}}</h4>
            </div>
            <p class="post-card__date">{{date}}</p>
        </a>
`;

export async function renderPostCard(word) {
    const template = Handlebars.compile(templateSource);
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
            console.error("Render postCard error ‼️:", error);
    }
}

// Render Admin

const templateSourceAdmin = `
        <div class="post-card--admin" id="post-card--admin">
            <img class="post-card__cover--admin" src="{{cover}}" alt="img">
            <h3 class="post-card__title--admin">{{title}}</h3>
            <div class="post-card__author-info--admin">
                <img class="post-card__author-image--admin" src="{{authorAvatar}}" alt="{{author}}">
                <h4 class="post-card__author-name--admin">{{author}}</h4>
            </div>
            <p class="post-card__date--admin">{{date}}</p>
            <p class="post-card__text--admin">{{text}}</p>
            <div class="post-card__btn-group--admin">
                <a href="#post-form--edit">
                    <button class="post-card__btn-edit--admin" id="{{id}}" type="button">
                        <span class="icon-pen" style="display: flex; justify-content: center; align-items: center;"></span>
                    </button>
                </a>
                <button class="post-card__btn-delete--admin" id="{{id}}" type="button">
                    <span class="icon-basket" style="width: 20px; height: 20px; display: flex; justify-content: center; align-items: center;"></span>
                </button>
                <a class="post-card__btn-visit--admin" id="{{id}}" href="./postPage.html" target="_blank">Visit</a>
            </div>
        </div>
`;

export async function renderPostCardAdmin() {
        const template = Handlebars.compile(templateSourceAdmin);
        try {
            const {data} = await axios.get('http://localhost:3000/posts');          
            postsGalleryAdmin.innerHTML =  data.map(post => template(post)).join('');
        } catch (error) {
            console.error("Render postCardAdmin error ‼️:", error);
        }
}