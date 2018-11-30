import config from '../config.js';
import {get, post} from './DataMapper';

class CommentMapper {

    getPostComments(post, pageSize, pageNumber) {
        return get(config.restUrl + `posts/${post}/page/${pageSize}/${pageNumber}`);
    }

    getPostCommentsCount(post){
        return get(config.resultUrl + `posts/${post}/count`).then(response => {
            return response.status === 200 ? Promise.resolve(response.body.count) : -1;
        });
    }
}

export default CommentMapper;