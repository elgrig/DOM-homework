import { comments } from "../main.js";
import { renderComments } from "./renderComments.js";

const commentInputElement = document.getElementById('comment-input');

export const initLikeComments = () => {
    const likeCommentsElements = document.querySelectorAll(".like-button");
    for (const likeCommentElement of likeCommentsElements) {
        likeCommentElement.addEventListener('click', (event) => {
            const index = likeCommentElement.dataset.index;
            if (comments[index].isLiked === false) {
                comments[index].isLiked = true;
                comments[index].likes++;
            }
            else {
                comments[index].isLiked = false;
                comments[index].likes--;
            }
            event.stopPropagation();
            renderComments({ comments });
        });
    };
};

export const initRepostCommentElements = () => {
    const repostCommentElements = document.querySelectorAll(".comment-body");
    for (const repostCommentElement of repostCommentElements) {
        repostCommentElement.addEventListener('click', () => {
            const index = repostCommentElement.dataset.index;
            commentInputElement.value = 'QUOTE_BEGIN' + comments[index].name + ":" + "\n" + comments[index].text + 'QUOTE_END';
        });
    };
};