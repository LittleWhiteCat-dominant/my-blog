import { observable } from 'mobx';
import Post from '../interfaces/post';

const globalStore = observable({
  allPosts: [],

  setPosts(post: Post[]) {
    this.allPosts = post;
  }
})

export default globalStore;