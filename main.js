import { getComments, postComment } from "./modules/api.js";
import { getDate } from "./modules/date.js";
import { renderComments } from "./modules/renderComments.js";

const nameInputElement = document.getElementById('name-input');
const commentInputElement = document.getElementById('comment-input');
const buttonElement = document.getElementById('button-write');
const preloaderElement = document.getElementById('preloader');


function fetchAndRenderComments() {

    getComments().then((responseData) => {
        console.log(responseData);

        const appComments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                date: getDate(comment.date),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            }
        });

        comments = appComments;
        renderComments({ comments });
        preloaderElement.classList.add('hide');
        
    }).catch((error) => {
        if (error.message === 'Сервер недоступен') {
            alert('Сервер недоступен');
        } else {
            alert('Кажется, у вас сломался интернет, попробуйте позже');
        }
        console.log(error);
    });
};

export let comments = [];

fetchAndRenderComments();
renderComments({ comments });

const postComments = () => {

    nameInputElement.classList.remove('error');
    commentInputElement.classList.remove('error');

    if (nameInputElement.value.trim() === "") {
        nameInputElement.classList.add('error');
        return;
    } else if (commentInputElement.value.trim() === "") {
        commentInputElement.classList.add('error');
        return;
    }

    buttonElement.disabled = true;
    buttonElement.textContent = 'Комментарий загружается...';

    postComment({
        name: nameInputElement.value.replaceAll("&", "&amp;").replaceAll(">", "&gt;").replaceAll("<", "&lt;").replaceAll('"', "&quot;"),
        text: commentInputElement.value.replaceAll("&", "&amp;").replaceAll(">", "&gt;").replaceAll("<", "&lt;").replaceAll('"', "&quot;"),
    }).then(() => {
        return fetchAndRenderComments();
    }).then(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
        nameInputElement.value = "";
        commentInputElement.value = "";
    }).catch((error) => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
        if (error.message === 'Имя / коммент содержат менее 3 символов') {
            alert('Поля "имя" / "комментарий" должны содержать хотя бы 3 символа');
            return;
        } else if (error.message === 'Сервер недоступен') {
            postComments();
        } else {
            alert('Кажется, у вас сломался интернет, попробуйте позже');
        }
        console.log(error);
    });
};

buttonElement.addEventListener("click", postComments);