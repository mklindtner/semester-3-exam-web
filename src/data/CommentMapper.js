import config from '../config.js';
import {get, post} from './DataMapper';

class CommentMapper {

    createPostComment(postId, contents){
        return post(config.restUrl + `posts/${postId}/comments`, {
            contents
        });
    }

    getPostComments(postId, pageSize, pageNumber) {
        return get(config.restUrl + `posts/${postId}/comments/page/${pageSize}/${pageNumber}`);
    }

    getPostCommentsCount(postId){
        return get(config.restUrl + `posts/${postId}/comments/count`).then(response => {
            return response.status === 200 ? Promise.resolve(response.body.count) : -1;
        });
    }
}

export default CommentMapper;