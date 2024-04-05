import { registration, setUser } from "./api.js";
import { renderMainPage } from "./renderComments.js";
import { renderLogin } from "./renderLogin.js";

export const renderRegistration = ({ fetchAndRenderComments }) => {

    const appElement = document.getElementById("container");

    const registerForm = `
<div class="container">
    <div class="add-form">
        <h3 class="form-title">Форма регистрации</h3>
        <input type="text" id="name-input" class="add-form-text" placeholder="Введите имя" />
        <input type="text" id="login-input" class="add-form-text" placeholder="Введите логин" />
        <input type="text" id="password-input" class="add-form-text" placeholder="Введите пароль" />
        <button class="add-form-button" id="register-button">Зарегистрироваться</button>
        <button class="link" id="link-enter">Войти</button>
    </div>
    <br />
</div>    
`;
    appElement.innerHTML = registerForm;

    const linkEnterElement = document.getElementById("link-enter");
    linkEnterElement.addEventListener("click", () => {
        renderLogin({ fetchAndRenderComments });        
    })

    const nameInputElement = document.getElementById("name-input");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");

    const registerButtonElement = document.getElementById("register-button");

    registerButtonElement.addEventListener("click", () => {

        nameInputElement.classList.remove('error');
        loginInputElement.classList.remove('error');
        passwordInputElement.classList.remove('error');

        if (nameInputElement.value.trim() === "") {
            nameInputElement.classList.add('error');            
            return;
        } else if (loginInputElement.value.trim() === "") {
            loginInputElement.classList.add('error');
            return;
        } else if (passwordInputElement.value.trim() === "") {
            passwordInputElement.classList.add('error');
            return;
        }

        registration ({
            name: nameInputElement.value.replaceAll("&", "&amp;").replaceAll(">", "&gt;").replaceAll("<", "&lt;").replaceAll('"', "&quot;"),
            login: loginInputElement.value.replaceAll("&", "&amp;").replaceAll(">", "&gt;").replaceAll("<", "&lt;").replaceAll('"', "&quot;"),
            password: passwordInputElement.value.replaceAll("&", "&amp;").replaceAll(">", "&gt;").replaceAll("<", "&lt;").replaceAll('"', "&quot;"),
        }).then((responseData) => {
            setUser(responseData.user);
        }).then(() => {
            renderMainPage({ comments, fetchAndRenderComments });
        }).catch((error) => {
            if (error.message = 'Пользователь с таким логином уже существует') {
                alert(error.message);
                console.log(error);
            } else {
                alert('Кажется, интернет сломался, попробуйте позже');
            }            
        })
    });
};




