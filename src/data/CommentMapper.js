import config from '../config.js';
import {get, post, deleter} from './DataMapper';

class CommentMapper {

    createPostComment(postId, contents){
        return post(config.restUrl + `comments/${postId}/`, {
            contents
        });
    }

    getPostComments(postId, pageSize, pageNumber) {
        return get(config.restUrl + `comments/${postId}/page/${pageSize}/${pageNumber}`);
    }

    deletePostComments(commentId){
        return deleter(config.restUrl + `comments/${commentId}`);
    }

    getPostCommentsCount(postId){
        return get(config.restUrl + `commentparent/${postId}/count`).then(response => {
            return response.status === 200 ? Promise.resolve(response.body.count) : -1;
        });
    }
}

export default CommentMapper;