const { default: axios } = require("axios");
import { formCleaner } from "./formCleaner";
import { renderPostPage } from "./renderPostPage";
import { viewPhotoFunc } from "./viewPhoto";

const commentForm = document.getElementById("comment-form");

if (commentForm) {
    commentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const postId = localStorage.getItem("selectedPostId");

        const randomSeed = Math.random().toString(36).substring(2, 10);
        const avatarUrl = `https://api.dicebear.com/7.x/adventurer/png?seed=${randomSeed}`;

        const commentatorAvatar = avatarUrl;
        const commentatorName = commentForm.elements.commentatorName.value;
        const commentatorComment = commentForm.elements.commentatorComment.value;

        const commentData = {
            commentatorAvatar,
            commentatorName,
            commentDate: new Date().toDateString(),
            commentatorComment
        }
        console.log(commentData);
        addComment(postId, commentData);
        formCleaner(commentForm);
    });
} 

export async function addComment(id, commentData) {
    try {
        const { data: post } = await axios.get(`http://localhost:3000/posts/${id}`);

        const updatedComments = [...post.postComments, commentData];

        await axios.patch(`http://localhost:3000/posts/${id}`, {
            postComments: updatedComments,
            commentsNumber: updatedComments.length,
        });
        renderPostPage(id);
        viewPhotoFunc();
    } catch (error) {
        console.error("Failed to add comment ‼️:", error);
    }
}