import { comments } from "../main.js";
 
const listElement = document.getElementById('list');
const commentInputElement = document.getElementById('comment-input');


export const renderComments = ({ comments }) => {
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment">
    <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
    </div>
    <div class="comment-body" data-index="${index}">    
        <div class="comment-text">
        ${comment.text.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>")}
        </div >
    </div >
    <div class="comment-footer">
        <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index="${index}" class="like-button ${comments[index].isLiked ? "-active-like" : ""}"></button>
    </div>
    </div >
    </li > `
    }).join("");

    listElement.innerHTML = commentsHtml;

    initLikeComments();

    initRepostCommentElements();

};

const initLikeComments = () => {
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

const initRepostCommentElements = () => {
    const repostCommentElements = document.querySelectorAll(".comment-body");
    for (const repostCommentElement of repostCommentElements) {
        repostCommentElement.addEventListener('click', () => {
            const index = repostCommentElement.dataset.index;
            commentInputElement.value = 'QUOTE_BEGIN' + comments[index].name + ":" + "\n" + comments[index].text + 'QUOTE_END';
        });
    };
};