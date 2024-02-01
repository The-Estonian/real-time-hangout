import { NewElement } from '../helpers/createElement';
import { GetPosts } from '../backendConnection/getPosts';

export const Forum = () => {
  GetPosts().then((data) => {
    console.log(data);
  });
  const forumContainer = NewElement('div', 'container_forum');
  const forumPost = NewElement('div', 'container_forum_post');
  const postTitle = NewElement(
    'h3',
    'container_forum_post_title',
    'Post title goes here!'
  );
  const postContent = NewElement(
    'span',
    'container_forum_post_content',
    'Post content goes here!'
  );
  forumPost.appendChild(postTitle);
  forumPost.appendChild(postContent);
  // forumContent clickable to open single post
  forumContainer.appendChild(forumPost);
  return forumContainer;
};
