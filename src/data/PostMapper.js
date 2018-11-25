import { post, get } from './DataMapper'
import config from '../config.js'

class PostMapper {
  submitTextPost = (submittedPost) => {
    return post(config.restUrl + 'posts/text', submittedPost)
  }

  getRollingPosts(user, pageSize, cutoff) {
    return get(config.restUrl + `posts/user/${user}/${pageSize}/${cutoff === null ? "" : "?cutoff=" + cutoff}`);
  }
}

export default PostMapper