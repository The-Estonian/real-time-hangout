import { NewElement } from '../helpers/createElement';
import { GetComment } from '../backendConnection/getComment';
import { NewComment } from './newComment';

export const GetComments = (postid) => {
  let allPostComments = document.querySelector('.container_forum_comments');
  GetComment(postid).then((data) => {
    const currentComments = NewElement(
      'span',
      'container_forum_comments_title',
      'Current Comments'
    );
    allPostComments.appendChild(currentComments);
    if (data != null) {
      data.forEach((e) => {
        const singleComment = NewElement(
          'div',
          'container_forum_comments_comment'
        );
        const singleCommentTitle = NewElement(
          'span',
          'container_forum_comments_comment_title',
          `Comment:`
        );
        const singleCommentContent = NewElement(
          'span',
          'container_forum_comments_comment_content',
          e.Comment
        );
        const singleCommentUser = NewElement(
          'span',
          'container_forum_comments_comment_user',
          `By: ${e.ByUser}`
        );
        singleComment.appendChild(singleCommentTitle);
        singleComment.appendChild(singleCommentContent);
        singleComment.appendChild(singleCommentUser);
        allPostComments.appendChild(singleComment);
      });
    }
    // add comments
    const addCommentTitle = NewElement(
      'span',
      'container_forum_comments_title',
      'Add a Comment'
    );
    const addCommentContent = NewElement(
      'input',
      'container_forum_comments_input'
    );
    const addCommentSubmit = NewElement(
      'button',
      'container_forum_comments_submit',
      'Submit'
    );

    // send comment to server
    addCommentSubmit.addEventListener('click', () => {
      NewComment(addCommentContent.value, postid);
      addCommentContent.value = '';
    });

    allPostComments.appendChild(addCommentTitle);
    allPostComments.appendChild(addCommentContent);
    allPostComments.appendChild(addCommentSubmit);
  });
};
