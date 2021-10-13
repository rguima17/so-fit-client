function CommentPost(props) {
  return (
    <div className="bg-white my-2 mx-2 rounded-2xl">
      <div className="py-2">
        <form className="my-3 flex flex-row px-2 items-center">
          <textarea
            rows="1"
            className="form-textarea w-full border-1 border-gray-400"
            name="comment"
            placeholder="Insert your comment"
            onChange={props.handleChange}
            value={props.comment.text}
            required
          />
          <div className="bg-indigo-500 rounded-full p-1 pl-1 pr-2 h-9 w-9 ml-2">
            <i
              className="fas fa-paper-plane text-white text-xl"
              onClick={props.handleComment}
            ></i>
          </div>
        </form>
        <div className="lg:max-h-96 lg:overflow-auto">
        {props.commentList.map((comment, index) => {
          return (
            <div className="flex mt-2 items-center" key={comment + index}>
              <div className="flex-shrink-0 mx-2">
                <img
                  className="mt-2 rounded-full  w-8 h-8 sm:w-10 sm:h-10"
                  src={comment.postedByPicture}
                  alt={comment.postedByName}
                />
              </div>
              <div className="flex-1 border rounded-lg mr-2 px-4 py-2 sm:px-6 sm:py-4 l bg-gray-100">
                <strong>{comment.postedByName}</strong>
                <p className="text-sm text-gray-600">{comment.text}</p>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default CommentPost;
