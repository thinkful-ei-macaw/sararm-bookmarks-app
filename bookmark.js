'use strict';

import store from './store.js';
import api from './api.js';





/******** RENDER FUNCTIONS ********/


function render(id, expand, editID){
  renderError();

    if(store.adding){
      $('main').html(generateAddBookmarkView());
    }

    else if(store.filter !== 0 && !id){
      let html = [generateInitialView(), generateFilteredResults(store.filter)].join('')
      $('main').html(html);

    }

    else if(store.editing){
      let html = generateEditView(id)   
      $('main').html(html);
    }

    else if(expand !== undefined){
      let html = generateExpandedView(id, expand)
      $(expand).html(html);
    }

    else{
      let html = [generateInitialView(), generateItem()].join('')
      $('main').html(html);
    };
  };
  
  function renderError() {
    if (store.error.code) {
      $('div.error-container').html(`${store.error.message}`)
      console.log('render', store.error);
    } else {
      $('div.error-container').empty();
    }
  };
  

/******** GENERATORS ********/

//generates html for Add new bookmark view
function generateAddBookmarkView(){

  return `<div class="error-container"></div>
  <div class="title-container">
    <h1>My Bookmarks</h1>
  </div>
  <div class="url-and-title">
  <form id="new-bookmark-form" action="#">
    <label for="name">URL goes here:</label>
      <input type="url" id="new-bookmark-input" class="new-bookmark" name="url" placeholder="https//yourbookmarklinkhere" 
      required>
    <label for="name">Bookmark name goes here:</label>
      <input type="text" id="new-bookmark-title" class="new-bookmark" name="title" placeholder="Bookmark title" required>
      <select name="rating" class="rating-select">
      <option value="1">1 star</option>
      <option value="2">2 star</option>
      <option value="3">3 star</option>
      <option value="4">4 star</option>
      <option value="5">5 star</option>
    </div>
    </select>
    <div class="description-container">
      <input type="text" id="new-bookmark-description" class="new-bookmark" name="desc" placeholder="Add a description... (optional)">
    </div>  
    <button id=
    "cancel-new-bookmark" type="reset">Cancel</button>
    <button type="submit" id="add-new-bookmark">Add</button>
  </form>`
};


function generateItem(id){
  const htmlArr = [];
  let itemArr = store.bookmarks;
    for(let i = 0; i < itemArr.length; i++){
      htmlArr.push(`<li class="bookmark-data"  data-item-id="${itemArr[i].id}">
        ${itemArr[i].title} 
  <span class="star-rating">
  <form id="${itemArr[i].id}">
  ${generateRatings(itemArr[i].id)}
  </form><button id="delete-bookmark"></button></span>
  </li>`)
    }
  return htmlArr.join(' ');
  };

function generateFilteredResults(filter){
  const htmlArr = [];
  let itemArr = store.ratingFilter(filter);
  for(let i = 0; i < itemArr.length; i++){
    htmlArr.push(`<li class="bookmark-data"  data-item-id="${itemArr[i].id}">
      ${itemArr[i].title} 
      <span class="star-rating"><form id="${itemArr[i].id}">
      ${generateRatings(itemArr[i].id)}
    </form><button id="delete-bookmark"></button></span>
    </li>`)
  }
return htmlArr.join('');
}

function generateExpandedView(id, expand){

  let item = store.findById(id);
  if(item.expanded === true){
    store.collapse(id);
    $(expand).find('.expanded-bookmark-data').remove();
    return `${item.title} 
    <span class="star-rating"><form id="${item.id}">
    ${generateRatings(id)}
    </form><button id="delete-bookmark"></button></span>
    `;
  }
  else{
    store.expand(id);
    return `<li class="expanded-bookmark-data"  data-item-id="${item.id}">
    ${item.title}   
    <span class="star-rating"><form id="${item.id}">
    ${generateRatings(id)}
    </form></span>  
    <div class="description-container">
      Description: ${item.desc} 
      URL: <a class="link" href ="${item.url}">Visit this site</a></div>
    <button id="delete-bookmark"></button> <button id="edit-bookmark"></button>
    </li>`
  };
}

function generateRatings(id){
    let arr = [];
    
    // if(!id){
    //   let items = store.bookmarks
    //   //let rating = [];
    //   console.log(items)
      
    

      // for (let j = 0; j < rating.length; j++){
      //   for (let i = 0; i < 5; i++){
      //     arr.push(`<input type="checkbox" name="rating" value="${i}"
      //     ${rating[j] >= i ? 'checked' : ''}></input>`)}
      //   }
      //}

    // else{
      console.log(id);
      let item = store.findById(id);
      let rating = [item.rating];
      console.log(item.rating);
      for (let i = 0; i < 5; i++){
        arr.push(`<input type="checkbox" name="rating" value="${i}"
        ${rating > i ? 'checked' : ''}></input>`)}
    // }

  return arr.join(' ')
  
}

function generateEditView(id){
  let item = store.findById(id);
  return `<div class="error-container"></div><div class="title-container">
  <h1>My Bookmarks</h1>
</div>
<div class="url-and-title">
<form class="edit-bookmark-form" data-item-id="${item.id}" action="#">
  <label for="name">URL goes here:</label>
    <input type="url" id="new-bookmark-input" class="edit-bookmark" name="url" value="${item.url}" 
    required>
  <label for="name">Bookmark name goes here:</label>
    <input type="text" id="new-bookmark-title" class="edit-bookmark" name="title" value="${item.title}" required>
    <select name="rating" class="rating-select">
    <option value="1">1 star</option>
    <option value="2">2 star</option>
    <option value="3">3 star</option>
    <option value="4">4 star</option>
    <option value="5">5 star</option>
  </div>
  </select>
  <div class="description-container">
    <input type="text" id="new-bookmark-description" class="new-bookmark" name="desc" placeholder="Add a description... (required)" required>
  </div>  
  <button id=
  "cancel-edit" type="reset">Cancel</button>
  <button type="submit" id="edit-bookmark-submit">Submit</button>
</form>`

}

function generateInitialView(){

  return `
  <div class="error-container"></div>
  <div class="title-container">
    <h1>My Bookmarks</h1>
      <div class="title-button-container">
        <button class="new-bookmark-button" id="new-bookmark">Add New</button>
        <select name="filter-bookmark" class="filter-select">
        <option value="0">Minimum Rating</option>
        <option value="1">1 star</option>
        <option value="2">2 star</option>
        <option value="3">3 star</option>
        <option value="4">4 star</option>
        <option value="5">5 star</option>
      </select>
    </div>
  </div>`
}


/******** EVENT HANDLERS ********/


function handleNewBookmark(){
  $('main').on('click', '#new-bookmark', event => {
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
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
    })
  }); 
};

function handleEditButton(){
  $('main').on('click', '#edit-bookmark', event => {
    event.preventDefault();
    const id = getItemId(event.currentTarget);
    store.editing = true;
    store.collapse(id);
    render(id);

  });
}

function handleCancelEdit(){
  $('main').on('click', '#cancel-edit', event => {
    event.preventDefault();
    store.editing = false;
    render();
  });
}

function handleClickLink(){
  $('main').on('click', '.link', event=>{
    event.preventDefault();
    let link = $(event.currentTarget);
    window.open(link.attr("href"), event.currentTarget);
  })
}

function handleSubmitEdit(){
  $('main').on('submit', '.edit-bookmark-form', event => {
    event.preventDefault();

    const id = $(event.currentTarget).data('item-id') ;
    let formElement = document.querySelector(".edit-bookmark-form")
    const newFormData = serializeJson(formElement);

    api.updateBookmark(id, newFormData)
      .then(() => {
        store.findAndUpdate(id, newFormData);
        render();
    })
    store.editing = false;
  });
}

function handleExpand(){
  $('main').on('click', '.bookmark-data', event => {
    event.preventDefault();

    const id = getItemId(event.currentTarget);
    let item = event.currentTarget;
    render(id, item);
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
  handleEditButton();
  handleCancelEdit();
  handleSubmitEdit();
  handleClickLink()
  render()
};

$(bindEventListeners);


export default{
  render,
  renderError,
  bindEventListeners
};