 import axios from 'axios';


const url = 'http://localhost:8080/api/posts/';

class PostService {
  static async getPosts() {
    const res = await axios.get(url);
    const data = res.data;
  
    return data.map((post) => ({
      ...post,
      createAt: new Date(post.createAt),
    }));
  }

  // create post
  static insertPost(text) {
    return axios.post(url, { text });
  }

  // delete post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;



