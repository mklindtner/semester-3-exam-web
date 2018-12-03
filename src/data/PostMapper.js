import { post, get } from './DataMapper'
import config from '../config.js'

class PostMapper {
  createPost = (postToSubmit) => {
    return post(config.restUrl + 'posts', postToSubmit)
  }

  getRollingPosts(user, pageSize, cutoff) {
    return get(config.restUrl + `posts/user/${user}/${pageSize}/${cutoff === null ? "" : "?cutoff=" + cutoff}`);
  }
}

export default PostMapper