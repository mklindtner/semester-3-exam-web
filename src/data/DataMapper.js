function post(url, entity, ) {
    let status = -1;
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(entity)
    }).then(response => {
        status = response.status;
        return response.json();
    }).then(body => ({
        body,
        status
    }));
}

function get(url) {
    let status = -1;
    return fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        }
    }).then(response => {
        status = response.status;
        return response.json();
    }).then(body => ({
        body,
        status
    }));
}

export {
    get, post
}