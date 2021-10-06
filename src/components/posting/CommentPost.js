function CommentPost(props) {
  return (
    <div className="mx-auto max-w-screen-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>

      {props.comment.map((comment, index) => {
        return (
          <div className="flex mt-2" key={index}>
            <div className="flex-shrink-0 mr-3">
              <img
                className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                src={comment.postedByPicture}
                alt={comment.postedByName}
              />
            </div>
            <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 l">
              <strong>{comment.postedByName}</strong>
              <p className="text-sm">
                {comment.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CommentPost;
