import { login, setUser } from "./api.js";
import { renderMainPage } from "./renderComments.js";
import { renderRegistration } from "./renderRegistration.js";

export const renderLogin = ({ fetchAndRenderComments }) => {

    const appElement = document.getElementById("container");

    const loginHtml = `
    <div class="container">
        <div class="add-form">
            <h3 class="form-title">Форма входа</h3>
            <input type="text" id="login-input" class="add-form-text" placeholder="Логин" />
            <input type="text" id="password-input" class="add-form-text" placeholder="Пароль" />
            <button class="add-form-button" id="login-button">Войти</button>
            <button class="link" id="link-register">Зарегистрироваться</button>
        </div>
        <br />
    </div>
    `;

    appElement.innerHTML = loginHtml;

    const loginButtonElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");
    const linkRegisterElement = document.getElementById("link-register"); 
    
    

    linkRegisterElement.addEventListener("click", () => {       
        renderRegistration({ fetchAndRenderComments });      
    });

    loginButtonElement.addEventListener("click", () => {

        loginInputElement.classList.remove('error');
        passwordInputElement.classList.remove('error');

        if (loginInputElement.value.trim() === "" && passwordInputElement.value.trim() === "") {
            loginInputElement.classList.add('error');
            passwordInputElement.classList.add('error');
            return;
        } else if (loginInputElement.value.trim() === "") {
            loginInputElement.classList.add('error');
            return;
        } else if (passwordInputElement.value.trim() === "") {
            passwordInputElement.classList.add('error');
            return;
        }

        login({
            login: loginInputElement.value.replaceAll("&", "&amp;").replaceAll(">", "&gt;").replaceAll("<", "&lt;").replaceAll('"', "&quot;"),
            password: passwordInputElement.value.replaceAll("&", "&amp;").replaceAll(">", "&gt;").replaceAll("<", "&lt;").replaceAll('"', "&quot;"),

        }).then((responseData) => {
            // localStorage.setItem("user", JSON.stringify(responseData.user));
            setUser(responseData.user);
        }).then(() => {
            // fetchAndRenderComments();
            renderMainPage({ fetchAndRenderComments });
        }).catch((error) => {
            alert(error.message);
            console.log(error);
        })
    });
};