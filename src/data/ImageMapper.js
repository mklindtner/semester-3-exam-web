import { post, get } from './DataMapper'
import config from '../config.js'

class ImageMapper {

    constructor(authorization) {
        this.authorization = authorization == undefined ? "" : authorization;
    }

    create(image) {
        return post(config.restUrl + `images`, image);
    }

    getByUser(user) {

    }

    getByUserPaginated(user, pageSize, pageNumber) {
        return get(config.restUrl + `images/user/${user}/${pageSize}/${pageNumber}`);
    }
}

export default ImageMapper;