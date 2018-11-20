import config from '../config.js';

class UserMapper {

    getGenders = () => {
        return fetch(config.restUrl + "users/genders")
        .then(response => response.json());
    }

    create = (user) => {
        return fetch(config.restUrl + "users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(user)
        }).then(response => response.json());
    }
}

export default UserMapper;