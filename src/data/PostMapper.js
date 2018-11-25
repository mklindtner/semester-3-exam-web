import { post, get } from './DataMapper'
import config from '../config.js'

class PostMapper {
  submitPost = (submittedPost) => {
    return post(config.restUrl + 'posts', submittedPost)
  }

  getRollingPosts(user, pageSize, cutoff) {
    return get(config.restUrl + `posts/user/${user}/${pageSize}/${cutoff === null ? "" : "?cutoff=" + cutoff}`);
  }
}

export default PostMapper