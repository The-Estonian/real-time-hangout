import { SendNewComment } from '../backendConnection/sendNewComment';

export const NewComment = (comment, post) => {
  SendNewComment(comment, post);
//   const commentContainer = document.querySelector('.container_forum_comments');
};
