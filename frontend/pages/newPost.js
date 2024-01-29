import { NewElement } from '../helpers/createElement.js';
import { SendNewPost } from '../backendConnection/connection.js';
import { GetCookie } from '../helpers/getCookie.js';
import { AuthenticateUser } from '../backendConnection/authentication.js';

export const NewPost = () => {
  let titleTrigger = false;
  const postContainer = NewElement('div', 'container_postContent');
  const postTitle = NewElement('span', 'container_postContent_title', 'Title');
  postTitle.setAttribute('required', 'true');
  const titleContent = NewElement('input', 'container_postContent_title_input');
  titleContent.setAttribute('placeholder', 'Your Title goes here!');
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
    let getCookie = GetCookie('rtForumCookie');
    SendNewPost(getCookie, currTitle, currPost).then((data) => {
      if (data['post'] == 'accepted') {
        console.log(data);
      } else if (data['user'] == 'false') {
        AuthenticateUser();
      }
    });
  });

  postContainer.appendChild(postTitle);
  postContainer.appendChild(titleContent);
  postContainer.appendChild(post);
  postContainer.appendChild(postContent);
  postContainer.appendChild(postSubmit);
  return postContainer;
};
