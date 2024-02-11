import { NewElement } from '../helpers/createElement';
import { FetchPosts } from './fetchPosts';

import { GetComments} from "./getComments"


export const SinglePost = (data, e, catList) => {
  let forumContainer = document.querySelector('.container_forum');
  const forumContainerCategories = document.querySelector(
    '.container_forum_categories'
  );
  forumContainer.innerHTML = '';
  let currentNode = e.target;
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
  let allPostComments = NewElement('div', 'container_forum_comments');
  

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
  forumContainer.appendChild(returnButton);
  forumContainer.appendChild(singlePostContainer);
  forumContainer.appendChild(allPostComments);
  GetComments(dataPoint.Id);
};
