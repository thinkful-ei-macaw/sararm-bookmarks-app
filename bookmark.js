'use strict';

import store from './store.js';
import api from './api.js';





/******** RENDER FUNCTIONS ********/


function render(id, expand){
    if(store.adding){
      $('main').html(generateAddBookmarkView());
    }

    else if(store.filter !== 0){
      let html = [generateInitialView(), generateFilteredResults(store.filter)].join('')
      $('main').html(html);;

    }

    else if(id !== undefined){
      let html = generateExpandedView(id)
      $(expand).html(html);
    }

    else{
      let html = [generateInitialView(), generateItem()].join('')
      $('main').html(html);
    };

    //if(error){}
  
  };
  
  

/******** GENERATORS ********/

//generates html for Add new bookmark view
function generateAddBookmarkView(){

  return `
  <div class="container">
  <h1>My Bookmarks</h1>
  <form id="new-bookmark-form" action="#">
    <label for="name">Add a new bookmark:</label>
      <input type="url" id="new-bookmark-input" class="new-bookmark" name="url" placeholder="https//yourbookmarklinkhere" 
      required>
    <div class="description-container" >
      <input type="text" id="new-bookmark-title" class="new-bookmark" name="title" placeholder="Bookmark title" required>
      <select name="rating" class="rating-select">
      <option value="1">1 star</option>
      <option value="2">2 star</option>
      <option value="3">3 star</option>
      <option value="4">4 star</option>
      <option value="5">5 star</option>
    </select>
      <input type="text" id="new-bookmark-description" class="new-bookmark" name="desc" placeholder="Add a description... (optional)">
    </div>  
    <button id=
    "cancel-new-bookmark" type="reset">Cancel</button>
    <button type="submit" id="add-new-bookmark">Add</button>
  </form>
</div>`
};


function generateItem(id){
  const htmlArr = [];
  let itemArr = store.bookmarks;
    for(let i = 0; i < itemArr.length; i++){
      htmlArr.push(`<li class="bookmark-data"  data-item-id="${itemArr[i].id}">
        ${itemArr[i].title}, 
        Rating: ${itemArr[i].rating}
        <button id="delete-bookmark">Delete</button>
        </li>`)
    }
  return htmlArr;
  };

function generateFilteredResults(filter){
  const htmlArr = [];
  let itemArr = store.ratingFilter(filter);
  for(let i = 0; i < itemArr.length; i++){
    htmlArr.push(`<li class="bookmark-data"  data-item-id="${itemArr[i].id}">
      ${itemArr[i].title}, 
      Rating: ${itemArr[i].rating}
      <button id="delete-bookmark">Delete</button>
      </li>`)
  }
return htmlArr;
}

function generateExpandedView(id){
  let expandedItem = store.bookmarks.find(item=> item.id === id)
  store.expand(id)
  return `<li class="bookmark-data"  data-item-id="${expandedItem.id}">
  ${expandedItem.title}, 
  Rating: ${expandedItem.rating}
  Description: ${expandedItem.desc}
  URL: <a href="${expandedItem.url}">Let's go</a>
  <button id="delete-bookmark">Delete</button>
  </li>`
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


function handleNewBookmark(){
  $('main').on('click', '#new-bookmark', event => {
    console.log('click');
    store.adding = true;
    render();
  })
};

function handleFilterSelect(){
  $('main').on('change', '.filter-select', event => {
    store.filter = $('.filter-select').val();
    render();
  });
}

function serializeJson(form) {
  const formData = new FormData(form);
  const obj = {};
  formData.forEach((val, name) => obj[name] = val);
  return JSON.stringify(obj);
}


function handleCreate(){
  $('main').on('submit', '#new-bookmark-form', event => {
    event.preventDefault();

    let formElement = document.querySelector("#new-bookmark-form")
    const myFormData = serializeJson(formElement);
  
    api.createBookmark(myFormData)
      .then((newItem) => {
        store.addItem(newItem);
        render();
      })
      store.adding = false;
  });
};


function handleCancelCreate(){
  $('main').on('click', '#cancel-new-bookmark', event => {
    event.preventDefault();
    store.adding = false;
    render();
    })
  };

  function handleDelete(){
  //find current target by id and make api call to update store, update local store
  $('main').on('click', '#delete-bookmark', event => {
    event.preventDefault();
    const id = getItemId(event.currentTarget);
    console.log(id)
    api.deleteBookmark(id)
      .then(() => {
      store.findAndDelete(id);
      render();
    })
  }); 
};

function handleExpand(){
  $('main').on('click', '.bookmark-data', event => {
    const id = getItemId(event.currentTarget);
    let expand = event.currentTarget
    render(id, expand);
    })
}

function getItemId(item) {
  return $(item)
    .closest('.bookmark-data')
    .data('item-id');
};


function bindEventListeners(){
  handleCancelCreate();
  handleCreate();
  handleNewBookmark();
  handleDelete();
  handleFilterSelect();
  handleExpand();
  render()
};

$(bindEventListeners);


export default{
  render,
  bindEventListeners
};