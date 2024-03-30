import { login, setUser } from "./api.js";

export const renderLogin = ({ fetchAndRenderComments }) => {
    const appElement = document.getElementById("container");
    const loginHtml = `
    <div class="container">
        <div class="add-form">
            <h3 class="form-title">Форма входа</h3>
            <input type="text" id="login-input" class="add-form-text" placeholder="Логин" />
            <input type="text" id="password-input" class="add-form-text" placeholder="Пароль" />
            <button class="add-form-button" id="login-button">Войти</button>
            <button class="button-register">Зарегистрироваться</button>
        </div>
        <br />
    </div>
    `;

    appElement.innerHTML = loginHtml;

    const loginButtonElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");

    loginButtonElement.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            setUser(responseData.user);
        }).then(() => {
            fetchAndRenderComments();
        }).catch((error) => {
            alert(error.message);
            console.log(error);
        })
    });
};