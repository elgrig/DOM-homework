import { fetchAndRenderComments } from "../main.js";
import { postComment, user } from "./api.js";
import { initLikeComments, initRepostCommentElements } from "./listeners.js";
import { renderLogin } from "./renderLogin.js";

export const renderComments = ({ comments }) => {

  const container = document.querySelector(".comments");
  const commentsHtml = comments.map((comment, index) => {
    return `    
    <li class="comment">
    <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
    </div>
    <div class="comment-body" data-index="${index}">    
        <div class="comment-text">
        ${comment.text.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>")}
        </div>
    </div>
    <div class="comment-footer">
        <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index="${index}" class="like-button ${comments[index].isLiked ? "-active-like" : ""}"></button>
    </div>
    </div >
    </li > 
    `
  }).join("");

  container.innerHTML = commentsHtml;

  if (user?.token) {

  initLikeComments();

  initRepostCommentElements();

  }

};

export function renderForm() {

  const container = document.querySelector(".form");
      
  const addForm = `
    <div class="add-form">
    <input type="text" class="add-form-name" value="${user ? user.name.replaceAll("&", "&amp;").replaceAll(">", "&gt;").replaceAll("<", "&lt;").replaceAll('"', "&quot;") : ""}" readonly placeholder="Введите ваше имя" id="name-input">
    <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
      id="comment-input"></textarea>
      <div class="add-form-row">
      <button class="add-form-button" id="button-write">Написать</button>
      </div>  
    </div>
    `;

  const textAuth = `
    <div class="authorizationRequest">Чтобы добавить комментарий, <button id="authorize-button" class="authorize-button">авторизуйтесь</button></div>
    `;

  if (user?.token) {

      container.innerHTML = addForm;

      const buttonElement = document.getElementById('button-write');

      buttonElement.addEventListener("click", postComments);

    } else {    

      container.innerHTML = textAuth;

      const authorizeButtonElement = document.getElementById("authorize-button");

      authorizeButtonElement.addEventListener("click", () => {
        renderLogin()
      });
    }    
  }

  const postComments = () => {

      const nameInputElement = document.getElementById('name-input');
      const commentInputElement = document.getElementById('comment-input');

      const buttonElement = document.getElementById('button-write');

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
          alert('Кажется, интернет сломался, попробуйте позже');
        }
        console.log(error);
      });

  };








