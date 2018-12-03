import config from '../config.js';
import {get, post, deleter} from './DataMapper';

class CommentMapper {

    createPostComment(postId, contents){
        return post(config.restUrl + `posts/${postId}/comments`, {
            contents
        });
    }

    getPostComments(postId, pageSize, pageNumber) {
        return get(config.restUrl + `posts/${postId}/comments/page/${pageSize}/${pageNumber}`);
    }

    deletePostComments(postId, commentId){
        return deleter(config.restUrl + `posts/${postId}/comments/${commentId}`);
    }

    getPostCommentsCount(postId){
        return get(config.restUrl + `posts/${postId}/comments/count`).then(response => {
            return response.status === 200 ? Promise.resolve(response.body.count) : -1;
        });
    }
}

export default CommentMapper;