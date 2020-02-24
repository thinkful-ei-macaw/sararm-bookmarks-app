'use strict';

// The store object for the first 3 wireframes has been provided, and you will be responsible for creating the store object for the final "Form Error" wireframe.

//initial view

const bookmarks = [
    {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      description: 'lorem ipsum dolor sit',
      expanded: false
    }
  ];
let adding = false;
let error = null;
let filter = 0;


//expanded view
// const bookmarks = [
//   {
//     id: 'x56w',
//     title: 'Title 1',
//     rating: 3,
//     url: 'http://www.title1.com',
//     description: 'lorem ipsum dolor sit',
//     expanded: true
//   }
// ];
// let adding = false;
// let error = null;
// let filter = 0;




//add bookmark view
// const bookmarks = [. . .];
// let adding = true;
// let error = null;
// let filter = 0;


//error view
// const bookmarks = [. . .];
// let adding = true;
// let error = 'something went wrong';
// let filter = 0;


function findById(id){
  return this.bookmarks.find(currentItem => currentItem.id === id);
}

function findAndDelete(id){
  return this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
  // console.log(this.bookmarks);
}

function findAndUpdate(id, newData){
  const currentItem = this.findById(id);
  Object.assign(currentItem, newData);
}

function addItem(item){
  this.bookmarks.push(item);
}

function setError(error){
  this.error = error;
}

export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  findAndDelete,
  findAndUpdate,
  addItem,
  setError
};