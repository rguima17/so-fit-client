function ViewPostCard(props) {
  return (
    <div>
      <div className=" max-w-sm mt-4 mx-auto overflow-hidden bg-white  rounded-lg shadow-lg dark:bg-gray-800">
        <img
          className="object-fill  object-top w-full h-56 "
          src={props.pictureUrl}
          alt={`User ${props.name}`}
        />

        <div className="px-6 py-4">
          <div className="flex justify-between mb-1">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {props.name}
            </h1>
          </div>
          <p className="py-2  font-semibold text-lg text-gray-700 dark:text-gray-400">
            About: {props.description}
          </p>

          <div className="flex items-center mt-3 ">
            <p className=" font-semibold text-lg text-gray-700 dark:text-gray-400">
              Likes: {props.likes}
            </p>
          </div>
          <div className="flex items-center mt-3 ">
            <p className=" font-semibold text-lg text-gray-700 dark:text-gray-400">
              createdDate: {props.createdDate}
            </p>
          </div>
          <div className="flex items-center mt-3 ">
            <p className=" font-semibold text-lg text-gray-700 dark:text-gray-400">
              Created by: {props.postedBy}
            </p>
          </div>
          <div className="flex items-center mt-3 ">
            <p className=" font-semibold text-lg text-gray-700 dark:text-gray-400">
              Exercises:{" "}
              {props.exercises.map((exercise) => {
                return <li key={exercise}>{exercise}</li>;
              })}
            </p>
          </div>
        </div>
        <div className="flex justify-around ">
          <div
            className="flex justify-center w-25 px-6 py-2  leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={props.handleLike}
          >
            Like:{props.likes.length}
          </div>
          <div onClick={props.deletePost}>X</div>
        </div>
      </div>
    </div>
  );
}

export default ViewPostCard;
