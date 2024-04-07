import { getComments } from "./modules/api.js";
import { getDate } from "./modules/date.js";
import { renderComments } from "./modules/renderComments.js";


const preloaderElement = `
<div class="preloader" id="preloader">Страница загружается...</div>
`;

export let comments = [];

function fetchAndRenderComments() {

    const container = document.getElementById("container");
    container.innerHTML = preloaderElement;

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
        renderComments({ comments, fetchAndRenderComments });

        }).catch((error) => {
        if (error.message === 'Сервер недоступен') {
            console.log(error); // alert(error.message);
        } else {
            console.log(error); // alert('Кажется, у вас сломался интернет, попробуйте позже');
        }
        console.log(error);
    });
};

fetchAndRenderComments();




