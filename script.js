const nameInputElement = document.getElementById('name-input');
const commentInputElement = document.getElementById('comment-input');
const listElement = document.getElementById('list');
const buttonElement = document.getElementById('button-write');

const comments = [
    {
        name: "Глеб Фокин",
        text: "Это будет первый комментарий на этой странице",
        date: "12.02.22 12:18",
        counter: 3,
        isLiked: false,
    },
    {
        name: "Варвара Н.",
        text: "Мне нравится как оформлена эта страница! ❤",
        date: "12.02.22 12:18",
        counter: 75,
        isLiked: true,
    }
];

const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment">
    <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
    </div>
    <div class="comment-body">
        <div class="comment-text">
        ${comment.text}
        </div>
    </div>
    <div class="comment-footer">
        <div class="likes">
        <span class="likes-counter">${comment.counter}</span>
        <button data-index="${index}" class="like-button ${comments[index].isLiked ? "-active-like" : ""}"></button>
        </div>
    </div>
    </li>`
    }).join("");

    listElement.innerHTML = commentsHtml;

    initLikeComments();
};

const initLikeComments = () => {
    const likeCommentsElements = document.querySelectorAll(".like-button");
    for (const likeCommentElement of likeCommentsElements) {
        likeCommentElement.addEventListener('click', () => {
            const index = likeCommentElement.dataset.index;
            if (comments[index].isLiked === false) {
                comments[index].isLiked = true;
                comments[index].counter++;
            }
            else {
                comments[index].isLiked = false;
                comments[index].counter--;
            }
            renderComments();
        });
    };
};

renderComments();

buttonElement.addEventListener("click", () => {

    nameInputElement.classList.remove('error');
    commentInputElement.classList.remove('error');

    if (nameInputElement.value === "") {
        nameInputElement.classList.add('error');
        return;
    }
    if (commentInputElement.value === "") {
        commentInputElement.classList.add('error');
        return;
    }

    let date = new Date();
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
    let currentDate = date.getDate() + "." + months[date.getMonth()] + "." + date.getFullYear() + " " + date.getHours() + ":" + minutes[date.getMinutes()];

    comments.push({
        name: nameInputElement.value,
        text: commentInputElement.value,
        date: currentDate,
        counter: '0',
        isLiked: false,
    });

    renderComments();

    nameInputElement.value = "";
    commentInputElement.value = "";

});