'use strict';

// The store object for the first 3 wireframes has been provided, and you will be responsible for creating the store object for the final "Form Error" wireframe.

//initial bookmark
const store = {
  bookmarks: [
    {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      description: 'lorem ipsum dolor sit',
      expanded: false
    },
    {
      id: '6ffw',
      title: 'Title 2',
      rating: 5,
      url: 'http://www.title2.com',
      description: 'dolorum tempore deserunt',
      expanded: false
    } 
  ],
  adding: false,
  error: null,
  filter: 0
};


//expanded view
const store = {
  bookmarks: [
    {
      id: '7ddr',
      title: 'Title 11',
      rating: 5,
      url: 'http://www.title11.com',
      description: 'lorem ipsum dolor',
      expanded: true
    }
    ...
  ],
  adding: false,
  error: null,
  filter: 0
};



//add bookmark view
const store = {
  bookmarks: [...],
  adding: true,
  error: null,
  filter: 0
};





export default{
  store 
}