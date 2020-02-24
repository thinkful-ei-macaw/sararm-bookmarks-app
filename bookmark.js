'use strict';

import store from './store.js';
import api from './api.js';





/******** RENDER FUNCTIONS ********/


function render(){
  let filter = store.filter; 
  let error = store.error;
  let html = [generateInitialView(), generateItem()].join('');
    if(store.adding){
      $('main').html(generateAddBookmarkView());
    }

  
    else{
      $('main').html(html);
    };
  
    //if(isExpanded){}
  
    //if(error){}
  
  };
  
  

/******** GENERATORS ********/

//generates html for Add new bookmark view
function generateAddBookmarkView(){

  return `
  <div class="container">
  <h1>My Bookmarks</h1>
  <form id="new-bookmark-form" action="#">
    <label for="new-bookmark-input">Add a new bookmark:</label>
      <input type="text" id="new-bookmark-input" name="new-bookmark-input" placeholder="https//yourbookmarklinkhere"
      >
    <div class="description-container" >
      <input type="text" id="new-bookmark-title>" name="new-bookmark-title" placeholder="Bookmark title">
      <input type="text" id="new-bookmark-description" name="new-bookmark-description" placeholder="Add a description... (optional)">
    </div>  
    <button class="add-bookmark-button" id=
    "cancel-new-bookmark">Cancel</button>
    <button class="add-new-bookmark-button" id="add-new-bookmark type="submit">Add</button>
  </form>
</div>`
};

function generateItem(id){
  let itemArr = store.bookmarks;
  console.log(itemArr[0].title);

  itemArr.find



  return `
  <li class="bookmark-data">
  ${itemArr[0].title}
  </li>
 `
};

function generateExpandedView(){

};

function generateInitialView(){
  return `
  <div class="container">
    <h1>My Bookmarks</h1>
    <button class="new-bookmark-button" id="new-bookmark">Add New</button>
    <select name="filter-bookmark" class="filter-select">
      <option value="0">Minimum Rating</option>
      <option value="1">1 star</option>
      <option value="2">2 star</option>
      <option value="3">3 star</option>
      <option value="4">4 star</option>
      <option value="5">5 star</option>
    </select>
  </div>`
}




/******** EVENT HANDLERS ********/

//handles what happens when the 'new bookmark' button is clicked

//handles what happens when the add new bookmark button is clicked
function handleNewBookmark(){
  $('main').on('click', '#new-bookmark', event => {
    store.adding = true;
    render();
  })
};

//handles what happens when a rating-filter is selected
function handleFilterSelect(){
  $('main').on('change', '.filter-select', event => {
    store.filter = $('.filter-select').val();
    console.log(store.filter);
  });
}


//handles what happens when the delete button is clicked


function handleCreate(){
//will need to grab all input data and make api call to update store, and update local store

//store.adding = false;
};



//clears form, renders bookmark compressed view
function handleCancelCreate(){
  $('main').on('click', '#cancel-new-bookmark', event => {
    store.adding = false;
    render();
    })
  };

  function handleDelete(){
    //find current target by id and make api call to update store, update local store
};




function bindEventListeners(){
  handleCancelCreate();
  handleCreate();
  handleNewBookmark();
  handleDelete();
  handleFilterSelect();
  render()
};

$(bindEventListeners);


export default{
  render,
  bindEventListeners
};