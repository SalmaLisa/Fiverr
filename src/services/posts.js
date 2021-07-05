import http from './httpService'; 
import {apiUrl} from './../config/config';
const postsEndpoint = apiUrl.url+'/posts';


  function postUrl(id) {
    return `${postsEndpoint}/${id}`;
  }
  
  export function getPosts() {
    return http.get(postsEndpoint);
  }
  
  export function getPostsData() {
    return http.get(postsEndpoint+'/data');
  }
  

  export function getPost(Id) {
    return http.get(postUrl(Id));
  }
  
  export function savePost(post) {
    //clone
    const body = { ...post };
    console.log(body);
   //update
   if (post._id) {
     //delete _id
     delete body._id;
     return http.put(postUrl(post.id),body);
   }
 
   //add a new post
   return http.post(postsEndpoint, post);
 }
  
  //delete posts
  export function deletePost(Id) {
    return http.delete(postUrl(Id));
  }  