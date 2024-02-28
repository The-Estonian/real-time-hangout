import { NewElement } from '../helpers/createElement';
import { categories } from './newPost';
import { FetchPosts } from './fetchPosts';
import { socket } from '../backendConnection/checkState';

export const Forum = () => {
  const forumContainer = NewElement('div', 'container_forum');
  // categorie buttons
  const Allcategories = NewElement('div', 'container_forum_categories');
  let catList = [];
  categories.forEach((each) => {
    const category = NewElement(
      'img',
      'container_postContent_categories_catImg'
    );
    category.setAttribute('src', each.imgSrc);
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

  socket.onmessage = (e) => {
    let name = JSON.parse(e.data);
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

  return forumContainer;
};
