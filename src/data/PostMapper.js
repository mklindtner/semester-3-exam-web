import {post} from './DataMapper'
import config from '../config.js'

class PostMapper {
  submitPost = (submittedPost) => {
    return post(config.restUrl + 'posts', submittedPost)
  }
  
}

export default PostMapper