import {post} from './DataMapper'
import {baseURL} from '../../Config.js'

class PostMapper {
    submitPost = (submittedPost) => {
    return post(baseURL + 'posts' ,  submittedPost)
  }
}

export default PostMapper