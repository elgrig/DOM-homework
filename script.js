const nameInputElement = document.getElementById('name-input');
const commentInputElement = document.getElementById('comment-input');
const listElement = document.getElementById('list');
const buttonElement = document.getElementById('button-write');
const preloaderElement = document.getElementById('preloader');


function getDate(date) {
    const currentDate = new Date(date);
    const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
    return currentDate.getDate() + " " + months[currentDate.getMonth()] + " " + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + minutes[currentDate.getMinutes()];
}


function fetchAndRenderComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/elena-nikitenko/comments", {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
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
            renderComments();
            preloaderElement.classList.add('hide');
        });
};

let comments = [];

const renderComments = () => {
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
            renderComments();
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

fetchAndRenderComments();
renderComments();

const postComment = () => {

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

    fetch("https://wedev-api.sky.pro/api/v1/elena-nikitenko/comments", {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value.replaceAll("&", "&amp;").replaceAll(">", "&gt;").replaceAll("<", "&lt;").replaceAll('"', "&quot;"),
            text: commentInputElement.value.replaceAll("&", "&amp;").replaceAll("<", "&lt").replaceAll(">", "&gt;").replaceAll("<", "&lt;").replaceAll('"', "&quot;"),
            forceError: true,
        },)
    }).then((response) => {
        if (response.status === 201) {
            return response.json();
        } else if (response.status === 400) {
            throw new Error('Имя / коммент содержат менее 3 символов');
        } else if (response.status === 500) {
            throw new Error('Сервер недоступен');
        } else {
            throw new Error('Другая ошибка');
        }
    })
        .then(() => {
            return fetchAndRenderComments();
        })
        .then(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';
            nameInputElement.value = "";
            commentInputElement.value = "";
        })
        .catch((error) => {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';
            if (error.message === 'Имя / коммент содержат менее 3 символов') {
                alert('Поля "имя" / "комментарий" должны содержать хотя бы 3 символа');
                return;
            } else if (error.message === 'Сервер недоступен') {
                postComment();
            } else {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
            }
            console.log(error);
        });
};

buttonElement.addEventListener("click", postComment);