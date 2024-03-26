export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/elena-nikitenko/comments", {
        method: "GET",
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 500) {
            throw new Error('Сервер недоступен');
        } else {
            throw new Error('Другая ошибка');
        }
    })
}

export function postComment({ name, text }) {
    return fetch("https://wedev-api.sky.pro/api/v1/elena-nikitenko/comments", {
        method: "POST",
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