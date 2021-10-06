import { useState } from "react";

function CommentPost(props) {
  const [showComments, setShowComments] = useState(true);
  return (
    <div className="bg-white mx-auto max-w-screen-sm my-2">
      <div
        className="mt-2 bg-gray-100 py-1 rounded mb-1 flex text-gray-500 justify-center pl-10"
        onClick={() => {
          setShowComments(!showComments);
        }}
      >
        <h5 className="font-medium uppercase tracking-wider">Comments</h5>
        <div>
          {showComments ? (
            <i className="fas fa-chevron-up px-5 animate-pulse"></i>
          ) : (
            <i className="fas fa-chevron-down px-5 animate-pulse"></i>
          )}
        </div>
      </div>
      {showComments ? (
        <div className="py-2">
          <form className="mb-3 flex flex-row items-stretch px-2">
            <textarea
              rows="1"
              className="form-textarea w-2/3"
              name="comment"
              placeholder="Insert your comment"
              onChange={props.handleChange}
              value={props.comment.text}
              required
            />
            <button
              className="w-1/3 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              type="button"
              onClick={props.handleComment}
            >
              Post
            </button>
          </form>
          {props.commentList.map((comment, index) => {
            return (
              <div className="flex mt-2 items-center" key={comment + index}>
                <div className="flex-shrink-0 mx-2">
                  <img
                    className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                    src={comment.postedByPicture}
                    alt={comment.postedByName}
                  />
                </div>
                <div className="flex-1 border rounded-lg mr-2 px-4 py-2 sm:px-6 sm:py-4 l">
                  <strong>{comment.postedByName}</strong>
                  <p className="text-sm text-gray-600">{comment.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default CommentPost;
