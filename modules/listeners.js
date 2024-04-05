import { comments } from "../main.js";
import { renderMainPage } from "./renderComments.js";



export const initLikeComments = ({ fetchAndRenderComments }) => {
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
            renderMainPage({ comments, fetchAndRenderComments });
        });
    };
};



export const initRepostCommentElements = () => {
    const commentInputElement = document.getElementById('comment-input');
    const repostCommentElements = document.querySelectorAll(".comment-body");
    for (const repostCommentElement of repostCommentElements) {
        repostCommentElement.addEventListener('click', () => {
            const index = repostCommentElement.dataset.index;
            commentInputElement.value = 'QUOTE_BEGIN' + comments[index].name + ":" + "\n" + comments[index].text + 'QUOTE_END';
        });
    };
};