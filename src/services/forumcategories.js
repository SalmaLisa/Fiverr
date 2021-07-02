import http from './httpService'; 
import {forumcategoriesUrl} from './../config/config.json';
const forumcategoriesEndpoint = forumcategoriesUrl+'/actions';


  function actionUrl(id) {
    return `${forumcategoriesEndpoint}/${id}`;
  }
  
  export function getActions() {
    return http.get(forumcategoriesEndpoint);
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
   return http.post(forumcategoriesEndpoint, action);
 }
  
  //delete actions
  export function deleteAction(Id) {
    return http.delete(actionUrl(Id));
  }  