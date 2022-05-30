import http from './httpService'; 
import {apiUrl} from './../config/config';

// EndPoints..
const postsEndpoint = apiUrl.url+'/posts';
const topicsEndpoint = apiUrl.url+'/topics';


  function postUrl(id) {
    return `${postsEndpoint}/${id}`;
  }

  export function getTopics(){
    return http.get(topicsEndpoint+'/data');
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
   if (body._id) {
     //delete _id
     delete body._id;
     return http.put(postUrl(post._id),body);
   }
 
   //add a new post
   return http.post(postsEndpoint, post);
 }
  
  //delete posts
  export function deletePost(Id) {
    return http.delete(postUrl(Id));
  }  