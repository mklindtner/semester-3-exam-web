import config from '../config.js';
import {get, post} from './DataMapper';

class UserMapper {

    getGenders = () => {
        return get(config.restUrl + "users/genders");
    }

    create = (user) => {
        return post(config.restUrl + "users", user);
    }
}

export default UserMapper;