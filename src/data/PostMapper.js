import { post, get, deleter } from './DataMapper'
import config from '../config.js'

class PostMapper {
  createPost = (postToSubmit) => {
    return post(config.restUrl + 'posts', postToSubmit)
  }

  deletePost = (post) =>{
    return deleter(config.restUrl + `posts/${post}`)
  }

  getRollingPosts(user, pageSize, cutoff) {
    return get(config.restUrl + `posts/user/${user}/${pageSize}/${cutoff === null ? "" : "?cutoff=" + cutoff}`);
  }
}

export default PostMapper