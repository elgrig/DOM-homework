import { postComment, user } from "./api.js";
import { initLikeComments, initRepostCommentElements } from "./listeners.js";
import { renderComments } from "./renderComments.js";
import { renderLogin } from "./renderLogin.js";

export const renderApp = ({ comments, fetchAndRenderComments }) => {
    const container = document.getElementById("container");

  const addForm = `
  <div class="add-form">
  <input type="text" class="add-form-name" value="${user ? user.name : ""}" readonly placeholder="Введите ваше имя" id="name-input">
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

  renderComments({ comments });

  const formContainer = document.createElement("div");
  formContainer.innerHTML = user.token ? addForm : textAuth;
  container.appendChild(formContainer); 


  if (!user.token) {
    const authorizeButtonElement = document.getElementById("authorize-button");

    authorizeButtonElement.addEventListener("click", () => {
      renderLogin({ fetchAndRenderComments })
    });
  }

  if (user.token) {

    const buttonElement = document.getElementById('button-write');

    const postComments = () => {

      const nameInputElement = document.getElementById('name-input');
      const commentInputElement = document.getElementById('comment-input');

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
          alert('Кажется, интернет сломался, попробуйте позже');
        }
        console.log(error);
      });
    };

    buttonElement.addEventListener("click", postComments);

  };


  if (user.token) {
    initLikeComments({ fetchAndRenderComments });
  };

  if (user.token) {
    initRepostCommentElements();
  };

};
