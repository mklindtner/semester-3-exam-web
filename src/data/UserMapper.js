import config from '../config.js';
import { get, post, put } from './DataMapper';

class UserMapper {

    getGenders = () => {
        return get(config.restUrl + "users/genders");
    }

    create = (user) => {
        return post(config.restUrl + "users", user);
    }

    authenticate = (email, password) => {
        return post(config.restUrl + "authentication/user", { email, password });
    }

    getUser(id) {
        return get(config.restUrl + "users/" + id);
    }

    updateProfileImage = (user, image) => {
        return put(config.restUrl + "users/" + user + "/profile-image", image);
    }
}

export default UserMapper;