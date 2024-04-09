import { getComments } from "./modules/api.js";
import { getDate } from "./modules/date.js";
import { renderComments, renderForm } from "./modules/renderComments.js";

export let comments = [];

export function fetchAndRenderComments() {
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
        const preloaderElement = document.getElementById("preloader");
        preloaderElement.classList.add('hide');
        }).catch((error) => {
        if (error.message === 'Сервер недоступен') {
            console.log(error); // alert(error.message);
        } else {
            console.log(error); // alert('Кажется, у вас сломался интернет, попробуйте позже');
        }
        console.log(error);
    });
};

export function renderMainPage() {
    const container = document.getElementById("container");
    container.innerHTML = `<div class="preloader" id="preloader">Страница загружается...</div><ul class="comments"></ul><div class="form"></div>`;
    renderForm();
    fetchAndRenderComments();
  };
  
renderMainPage();




