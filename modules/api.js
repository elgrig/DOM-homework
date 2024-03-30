export let user = {};
export const setUser = (newUser) => {
    user = newUser;
};

export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v2/elena-nikitenko/comments", {
        method: "GET",
    }).then((response) => {
        if (response.status === 500) {
            throw new Error('Сервер недоступен');
        } else if (response.status === 400) {
            throw new Error('Неправильный логин / пароль')
        }
        return response.json();
    });
}

export function postComment({ name, text }) {
    return fetch("https://wedev-api.sky.pro/api/v2/elena-nikitenko/comments", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
            name: name,
            text: text,
            forceError: false,
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
}

export function login({ login, password }) {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        },)
    }).then((response) => {
        if (response.status === 201) {
            return response.json();
        } else if (response.status === 400) {
            throw new Error('Неверный логин / пароль');
        } else if (response.status === 500) {
            throw new Error('Сервер недоступен');
        } else {
            throw new Error('Другая ошибка');
        }
    });
}

