import http from './httpService'; 
import {repliesUrl} from './../config/config.json';
const repliesEndpoint = repliesUrl+'/actions';


  function actionUrl(id) {
    return `${repliesEndpoint}/${id}`;
  }
  
  export function getActions() {
    return http.get(repliesEndpoint);
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
   return http.post(repliesEndpoint, action);
 }
  
  //delete actions
  export function deleteAction(Id) {
    return http.delete(actionUrl(Id));
  }  