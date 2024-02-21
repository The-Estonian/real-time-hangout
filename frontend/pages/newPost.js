import { NewElement } from '../helpers/createElement.js';
import { SendNewPost } from '../backendConnection/sendNewPost.js';
import { CheckUserState } from '../backendConnection/checkState.js';
import { Forum } from './forum.js';
import { socket } from '../backendConnection/checkState.js';

import blue from '../categories/blue.png';
import green from '../categories/green.png';
import orange from '../categories/orange.png';
import purple from '../categories/purple.png';
import red from '../categories/red.png';
import white from '../categories/white.png';
import yellow from '../categories/yellow.png';

export const categories = [
  {
    id: 1,
    imgSrc: blue,
    imgAlt: 'blue circle',
  },
  {
    id: 2,
    imgSrc: green,
    imgAlt: 'green circle',
  },
  {
    id: 3,
    imgSrc: orange,
    imgAlt: 'orange circle',
  },
  {
    id: 4,
    imgSrc: purple,
    imgAlt: 'purple circle',
  },
  {
    id: 5,
    imgSrc: red,
    imgAlt: 'red circle',
  },
  {
    id: 6,
    imgSrc: white,
    imgAlt: 'white circle',
  },
  {
    id: 7,
    imgSrc: yellow,
    imgAlt: 'yellow circle',
  },
];

export const NewPost = () => {
  let titleTrigger = false;
  const postContainer = NewElement('div', 'container_postContent');
  const containerTitle = NewElement(
    'p',
    'container_postContent_categories_title',
    'Pick your Category Ball!'
  );

  let catList = [];
  const Allcategories = NewElement('div', 'container_postContent_categories');

  categories.forEach((each) => {
    const category = NewElement(
      'img',
      'container_postContent_categories_catImg'
    );
    category.src = each.imgSrc;
    category.setAttribute('alt', each.imgAlt);
    category.setAttribute('id', each.id);
    category.addEventListener('click', (e) => {
      if (category.classList.contains('selectCat')) {
        category.classList.remove('selectCat');
      } else {
        category.classList.add('selectCat');
      }
      if (catList.includes(e.explicitOriginalTarget.id)) {
        catList = catList.filter((item) => item != e.explicitOriginalTarget.id);
      } else {
        catList.push(e.explicitOriginalTarget.id);
      }
    });
    Allcategories.appendChild(category);
  });

  const postTitle = NewElement('span', 'container_postContent_title', 'Title');
  postTitle.setAttribute('required', 'true');
  const titleContent = NewElement('input', 'container_postContent_title_input');
  titleContent.setAttribute('placeholder', 'Your Title goes here!');
  titleContent.setAttribute('maxlength', '25');
  const post = NewElement('span', 'container_postContent_post', 'Post');
  const postContent = NewElement(
    'textarea',
    'container_postContent_post_input'
  );
  postContent.setAttribute('placeholder', 'Your post goes here!');
  postContent.setAttribute('required', 'true');
  const postSubmit = NewElement(
    'button',
    'container_postContent_submit',
    'Submit'
  );
  postSubmit.setAttribute('disabled', 'true');
  titleContent.addEventListener('input', () => {
    if (titleContent.value.length > 0) {
      titleTrigger = true;
    }
  });
  postContent.addEventListener('input', () => {
    if (titleTrigger && postContent.value.length > 0) {
      postSubmit.removeAttribute('disabled');
    } else {
      postSubmit.setAttribute('disabled', 'true');
    }
  });

  postSubmit.addEventListener('click', (e) => {
    let currTitle = titleContent.value;
    let currPost = postContent.value;
    SendNewPost(currTitle, currPost, catList).then((data) => {
      if (data['post'] == 'accepted') {
        // forward to forum
        CheckUserState(Forum, true);
      } else if (data['post'] == 'rejected') {
        CheckUserState();
      }
    });
  });

  socket.onmessage = (e) => {
    let name = JSON.parse(e.data);
    console.log(name);
    if (name.type != 'onlineStatus') {
      const rootAccess = document.querySelector('.container');
      const newMessageModal = NewElement(
        'span',
        'container_messages_notification',
        `New message from ${name.fromuser}`
      );
      rootAccess.appendChild(newMessageModal);
      setTimeout(() => {
        if (rootAccess.contains(newMessageModal)) {
          rootAccess.removeChild(newMessageModal);
        }
      }, '3000');
    }
  };

  postContainer.appendChild(containerTitle);
  postContainer.appendChild(Allcategories);
  postContainer.appendChild(postTitle);
  postContainer.appendChild(titleContent);
  postContainer.appendChild(post);
  postContainer.appendChild(postContent);
  postContainer.appendChild(postSubmit);
  return postContainer;
};
