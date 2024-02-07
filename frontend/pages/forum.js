import { NewElement } from '../helpers/createElement';
import { GetPosts } from '../backendConnection/getPosts';

export const Forum = () => {
  const forumContainer = NewElement('div', 'container_forum');
  try {
    GetPosts().then((data) => {
      console.log(data);
      if (data['login'] != "fail"){
        data.map((item) => {
          const forumPost = NewElement('div', 'container_forum_post');
          const postTitleContainer = NewElement(
            'div',
            'container_forum_post_title'
          );
          const postTitle = NewElement(
            'h3',
            'container_forum_post_title_content',
            item.Title
          );
          const postContent = NewElement(
            'span',
            'container_forum_post_content',
            item.Post
          );
          postTitleContainer.appendChild(postTitle);
          forumPost.appendChild(postTitleContainer);
          forumPost.appendChild(postContent);
          forumContainer.appendChild(forumPost);
        });
      }
    });
  } catch (err) {
    console.log('ERROR HERE CAUGHT!: ', err);
  }
  return forumContainer;
};
