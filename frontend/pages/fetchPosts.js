import { SinglePost } from './singlePost';
import { GetPosts } from '../backendConnection/getPosts';
import { NewElement } from '../helpers/createElement';
import {
  GetTimeDifference,
  FormattedTimeDifference,
} from '../helpers/timeDateManipulation';
import { CheckUserState } from '../backendConnection/checkState';

import blue from '../categories/blue.png';
import green from '../categories/green.png';
import orange from '../categories/orange.png';
import purple from '../categories/purple.png';
import red from '../categories/red.png';
import white from '../categories/white.png';
import yellow from '../categories/yellow.png';

export const FetchPosts = (catList) => {
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
            FormattedTimeDifference(GetTimeDifference(item.Created))
          );
          const Allcategories = NewElement(
            'div',
            'container_forum_all-posts_content_categories'
          );
          if (item.Categories != null) {
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
          }
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
      } else {
        CheckUserState();
      }
    }
  });
};
