'use strict';
import api from './api.js'
import bookmark from './bookmark.js';
import store from './store.js'

function main(){
  $(() => {
    $('body').before(`<div>${new Date()}</div>`);
  });
  
  api.getBookmark()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      bookmark.render()
      bookmark.renderError()
    });
  bookmark.render()
  bookmark.renderError()
};

$(main);