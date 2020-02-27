'use strict';

//this has all the store states for different views
// function generateCodeBlock(view){

//   if(view === 'initial'){
//     $('code').html(`'inital store state'
//     let bookmarks = [];
//     let adding = false;
//     let error = {};
//     let filter = 0;
//     let editing = false;`)
//   }

//   if(view === 'expanded'){
//     $('code').html(`'expanded view store state'
//       const bookmarks = [
//         {
//           id: 'x56w',
//           title: 'Title 1',
//           rating: 3,
//           url: 'http://www.title1.com',
//           description: 'lorem ipsum dolor sit',
//           expanded: true
//         }
//       ];
//       let adding = false;
//       let error = null;
//       let filter = 0;
//       let editing = false;`)
//   }

//   if(view === 'adding'){
//     $('code').html(`'add bookmark view store state'
//       const bookmarks = [. . .];
//       let adding = true;
//       let error = null;
//       let filter = 0;
//       let editing = false;`)
//   }

//   if(view === 'editing'){
//     $('code').html(`'edit bookmark view store state'
//       const bookmarks = [. . .];
//       let adding = false;
//       let error = null;
//       let filter = 0;
//       let editing = true;`)
//   }

//   if(view === 'filter'){
//     $('code').html(`'filter bookmark view store state'
//       const bookmarks = [. . .];
//       let adding = false;
//       let error = null;
//       let filter = ${store.filter};
//       let editing = false;`)
//   }

//   if(view === 'error'){
//     $('code').html(`'edit bookmark view store state'
//       const bookmarks = [. . .];
//       let adding = false;
//       let error = ${store.error.message};
//       let filter = 0;
//       let editing = false;`)
//   }
// }

let bookmarks = [];
let adding = false;
let error = {};
let filter = 0;
let editing = false;


function ratingFilter(filter){
  let filteredItems = this.bookmarks.filter(item => item.rating >= filter);
  return filteredItems;
}

function expand(id){
  return this.bookmarks.find(item=> item.id === id).expanded = true;
}

function collapse(id){
  return this.bookmarks.find(item=> item.id === id).expanded = false;
}

function findById(id){
  return this.bookmarks.find(currentItem => currentItem.id === id);
}

function findAndDelete(id){
  return this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
}

function findAndUpdate(id, newFormData){
  const currentItem = this.findById(id);
  let obj = JSON.parse(newFormData)
  Object.assign(currentItem, obj)
}

function addItem(newItem){
  !newItem.expanded;
  !newItem.editing;
  this.bookmarks.push(newItem);
}

function setError(error){
  this.error = error;
}

export default {
  bookmarks,
  adding,
  editing,
  error,
  filter,  
  findById,
  findAndDelete,
  findAndUpdate,
  addItem,
  setError,
  expand,
  collapse,
  ratingFilter
};