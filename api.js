'use strict';

import store from "./store.js";

const baseURL = 'https://thinkful-list-api.herokuapp.com/sararm/bookmarks'

function listAPIFetch(...args){
  return fetch(...args)

  .then((response)=>{
    return response.json();
  })
  .then((data)=>  {
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
};;


function updateBookmark(id, updateData){

  return listAPIFetch(`${baseURL}`);
}

function deleteBookmark(id){
  return listAPIFetch(`${baseURL}/${id}`, {
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