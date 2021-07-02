import http from './httpService'; 
import {postsUrl} from './../config/config.json';
const postsEndpoint = postsUrl+'/actions';


  function actionUrl(id) {
    return `${postsEndpoint}/${id}`;
  }
  
  export function getActions() {
    return http.get(postsEndpoint);
  }
  
  export function getAction(Id) {
    return http.get(actionUrl(Id));
  }
  
  export function saveAction(action) {
    //clone
    const body = { ...action };
    console.log(body);
   //update
   if (action.id) {
     //delete _id
     delete body.id;
     return http.put(actionUrl(action.id),body);
   }
 
   //add a new action
   return http.post(postsEndpoint, action);
 }
  
  //delete actions
  export function deleteAction(Id) {
    return http.delete(actionUrl(Id));
  }  