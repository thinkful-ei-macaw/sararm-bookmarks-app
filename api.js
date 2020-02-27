'use strict';

import store from "./store.js";
import bookmark from "./bookmark.js";

const baseURL = 'https://thinkful-list-api.herokuapp.com/sararm/bookmarks'

function listAPIFetch(...args){
  let error;

  return fetch(...args)

  .then((response)=>{

    if (!response.ok) {
      // if response is not 2xx, add an error code
      error = { code: response.status };
      store.setError(error);
      bookmark.renderError();

      //if the headers in the response don't contain a JSON object, add an error message
      if(!response.headers.get('content-type').includes('json')) {
        error.message = response.statusText;
        store.setError(error);
        bookmark.renderError();

        //immediately reject the promise
        return Promise.reject(error);
      }
    }
    //if response is 2xx ok, return response as normal
    return response.json();
  })

  .then((data)=>  {
    //if there's an error, place the error message from the JSON object into our error obj
    if (error){
      error.message = data.message;
        store.setError(error);
        bookmark.renderError();
      //reject the promise using our error obj
      return Promise.reject(error);
    }
    //if there's no error in the data object, return it as normal
    return data
  });
  }


function getBookmark(){
  return listAPIFetch(`${baseURL}`);
}

function createBookmark(myFormData){
 return listAPIFetch(`${baseURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: myFormData
  });
}


function updateBookmark(id, newData){
  return listAPIFetch(`${baseURL}/${id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newData
  });
}

function deleteBookmark(id){
  return listAPIFetch(`${baseURL}/${id} `, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export default{
  deleteBookmark,
  getBookmark,
  updateBookmark,
  createBookmark
}