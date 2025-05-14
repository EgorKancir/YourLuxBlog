import Handlebars from "handlebars";
import axios from "axios";
import { postPageContent } from "../index"

const templateSource = `
        <section class="post">
            <div class="post__info-group">
                <h2 class="post__title">{{title}}</h2>
                <div class="post__author-info">
                    <img class="post__author-image" src="{{authorAvatar}}" alt="{{author}}">
                    <h4 class="post__author-name">{{author}}</h4>
                </div>
                <p class="post__date">{{date}}</p>
            </div>
            <p class="post__main-text">{{text}}</p>
            <div class="post__gallery" id="post__gallery--id">
                {{#each imagesUrl}}
                <img class="post__gallery-image" src="{{this}}" alt="Img">
                {{/each}}
            </div>
            <div class="post-comments">
                <h3 class="post-comments__comments-number">{{commentsNumber}} comments</h3>
                {{#each postComments}}
                    <div class="post-comments__comment">
                        <div class="post-comments__commentator-info">
                            <img class="post-comments__commentator-avatar" src="{{commentatorAvatar}}" alt="{{commentatorName}}">
                            <h4 class="post-comments__commentator-name">{{commentatorName}}</h4>
                            <p class="post-comments__date">{{commentDate}}</p>
                        </div>
                        <p class="post-comments__commentator-comment">{{commentatorComment}}</p>
                    </div>
                {{/each}}
            </div>
        </section>
`

export async function renderPostPage(id) {
    if (!postPageContent) {
        console.error("Element postPageContent Not found ‼️!");
        return;
    }

    postPageContent.innerHTML = " ";
    const template = Handlebars.compile(templateSource);

    try {
        const { data } = await axios.get('http://localhost:3000/posts');
        const post = data.find(element => element.id === id);
        if (!post) {
            postPageContent.innerHTML = `<h3 class="post-page__error-text">Post was not found 😞</h3>`;
            return;
        }
        const html = template(post);
        postPageContent.innerHTML = html;
    } catch (error) {
        console.error("Render error ‼️:", error);
        postPageContent.innerHTML = `<h3 class="post-page__error-text">An error occurred when downloading post 😳</h3>`;
    }
}