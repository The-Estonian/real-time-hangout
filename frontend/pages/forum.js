import { NewElement } from '../helpers/createElement';
import { GetPosts } from '../backendConnection/getPosts';
import { cats } from './newPost';

import blue from '../categories/blue.png';
import green from '../categories/green.png';
import orange from '../categories/orange.png';
import purple from '../categories/purple.png';
import red from '../categories/red.png';
import white from '../categories/white.png';
import yellow from '../categories/yellow.png';

function getTimeDifference(startDate) {
  // Calculate the difference in milliseconds
  const currentTime = Date.now();
  const timeDifference = currentTime - new Date(startDate);

  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    seconds: seconds % 60,
    minutes: minutes % 60,
    hours: hours % 24,
    days: days,
  };
}

const formattedTimeDifference = (obj) => {
  if (obj.days > 0) {
    return `${obj.days}d`;
  } else if (obj.hours > 0) {
    return `${obj.hours}h`;
  } else if (obj.minutes > 0) {
    return `${obj.minutes}m`;
  } else if (obj.seconds > 0) {
    return `${obj.seconds}s`;
  } else {
    return '1s';
  }
};

const FetchPosts = (catList) => {
  GetPosts(catList).then((data) => {
    if (data != null) {
      if (data['login'] != 'fail') {
        let forumContainer = document.querySelector('.container_forum');

        data.map((item) => {
          const forumPost = NewElement('div', 'container_forum_all-posts');
          forumPost.setAttribute('id', item.Id);
          const postTitleContainer = NewElement(
            'div',
            'container_forum_all-posts_title'
          );
          const postTitle = NewElement(
            'h3',
            'container_forum_all-posts_title_content',
            item.Title
          );
          const postCreated = NewElement(
            'span',
            'container_forum_all-posts_title_created',
            formattedTimeDifference(getTimeDifference(item.Created))
          );
          const Allcategories = NewElement(
            'div',
            'container_forum_all-posts_content_categories'
          );
          item.Categories.forEach((e) => {
            const postCategory = NewElement(
              'img',
              'container_forum_all-posts_content_categories_img'
            );
            switch (e.Category) {
              case '1':
                postCategory.src = blue;
                break;
              case '2':
                postCategory.src = green;
                break;
              case '3':
                postCategory.src = orange;
                break;
              case '4':
                postCategory.src = purple;
                break;
              case '5':
                postCategory.src = red;
                break;
              case '6':
                postCategory.src = white;
                break;
              case '7':
                postCategory.src = yellow;
                break;
            }
            postCategory.setAttribute('alt', e.Category + ' Category');
            Allcategories.appendChild(postCategory);
          });
          postTitleContainer.appendChild(postTitle);
          // postTitleContainer.appendChild(postCreated);
          forumPost.appendChild(postTitleContainer);
          forumPost.appendChild(Allcategories);
          forumPost.appendChild(postCreated);
          forumPost.addEventListener('click', (e) => {
            SinglePost(data, e, catList);
          });
          forumContainer = document.querySelector('.container_forum');
          forumContainer.appendChild(forumPost);
        });
      }
    }
  });
};

export const SinglePost = (data, e, catList) => {
  let forumContainer = document.querySelector('.container_forum');
  const forumContainerCategories = document.querySelector(
    '.container_forum_categories'
  );
  forumContainer.innerHTML = '';
  let currentNode = e.target;
  console.log(currentNode);
  let dataPoint;
  while (currentNode) {
    if (currentNode.id) {
      dataPoint = data.filter((post) => post.Id == currentNode.id)[0];
      break;
    }
    currentNode = currentNode.parentNode;
  }
  const singlePostContainer = NewElement('div', 'container_forum_single-post');
  const singlePostTitle = NewElement(
    'span',
    'container_forum_single-post_title',
    dataPoint.Title
  );
  const singlePostContent = NewElement(
    'span',
    'container_forum_single-post_content',
    dataPoint.Post
  );
  const singlePostDate = NewElement(
    'span',
    'container_forum_single-post_date',
    `Created on: ${dataPoint.Created}`
  );
  const singlePostUser = NewElement(
    'span',
    'container_forum_single-post_user',
    `By: ${dataPoint.User}`
  );
  const returnButton = NewElement(
    'span',
    'container_forum_single-post_back',
    'Back'
  );

  returnButton.addEventListener('click', (e) => {
    forumContainer = document.querySelector('.container_forum');
    forumContainer.innerHTML = '';
    forumContainer.appendChild(forumContainerCategories);
    FetchPosts(catList);
  });

  singlePostContainer.appendChild(singlePostTitle);
  singlePostContainer.appendChild(singlePostContent);
  singlePostContainer.appendChild(singlePostDate);
  singlePostContainer.appendChild(singlePostUser);
  forumContainer.appendChild(singlePostContainer);
  forumContainer.appendChild(returnButton);
};

export const Forum = () => {
  const forumContainer = NewElement('div', 'container_forum');

  // categorie buttons
  const Allcategories = NewElement('div', 'container_forum_categories');
  let catList = [];
  cats.forEach((each) => {
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
    category.addEventListener('click', (e) => {
      forumContainer.innerHTML = '';
      forumContainer.appendChild(Allcategories);
      FetchPosts(catList);
    });
    Allcategories.appendChild(category);
  });

  forumContainer.appendChild(Allcategories);
  // all posts iterated
  FetchPosts(catList);
  return forumContainer;
};
