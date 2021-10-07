import { useState, useEffect } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";

import api from "../../apis/api";

function PostingEdit() {
  const { id } = useParams();
  const history = useHistory();

  const [posting, setPosting] = useState({
    name: "",
    description: "",
    workoutId: "",
    postedBy: "",
    pictureUrl: "",
    userId: "",
  });

  function handleChange(event) {
    if (event.target.files) {
      return setPosting({
        ...posting,
        [event.target.name]: event.target.files[0],
      });
    }
    return setPosting({ ...posting, [event.target.name]: event.target.value });
  }

  async function handleUpload(file) {
    const uploadData = new FormData();

    uploadData.append("pictureUrl2", file);

    const response = await api.post("/image-upload", uploadData);

    return response.data.url;
  }

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await api.get(`/workout/${id}`);

        setPosting({
          name: response.data.name,
          description: response.data.description,
          postedBy: response.data.userOwnerId,
          workoutId: response.data._id,
          userId: response.data.userOwnerId,
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchInitialData();
  }, [id]);

  async function handlePosting(event) {
    event.preventDefault();
    try {
      if (posting.pictureUrl2) {
        const pictureUrl = await handleUpload(posting.pictureUrl2);
        await api.post(`/posting/${id}`, { ...posting, pictureUrl });
        history.push("/profile");
      } else {
        await api.post(`/posting/${id}`, posting);
        history.push("/profile");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="bg-white px-1 pt-1 mt-2 mx-2 rounded-xl">
      <div className="flex justify-center items-center pr-6 pt-4 text-lg font-normal">
        <span className="pr-6 whitespace-nowrap inline">
          <NavLink
            to={`/workout/${id}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <i className="fas fa-arrow-circle-left text-2xl"></i>
          </NavLink>
        </span>
        <h5 className="inline text-xl">Edit your post</h5>
      </div>

      <form
        className="p-4 shadow-md rounded-md text-left border-gray-200"
        style={{ maxWidth: "92vw", marginLeft: "auto", marginRight: "auto" }}
      >
        <div className="grid">
          <div className="mb-3">
            <label className="text-gray-700 font-medium dark:text-gray-200">
              Post Name
            </label>

            <input
              type="text"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              name="name"
              placeholder="The default is the Workout Name"
              onChange={handleChange}
              value={posting.name}
              required
            />
          </div>
          <div className="mb-3">
            <label className="text-gray-700  font-medium dark:text-gray-200">
              Post Description
            </label>
            <textarea
              maxLength="300"
              rows="3"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              name="description"
              placeholder="The default is the Workout Description"
              onChange={handleChange}
              value={posting.description}
            ></textarea>
          </div>

          <div className="mb-1">
            <label className="text-gray-700 font-medium dark:text-gray-200">
              Picture
            </label>
            <input
              type="file"
              className="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              name="pictureUrl2"
              placeholder="Change your picture"
              onChange={handleChange}
            />
          </div>
          <div className="mt-3">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              onClick={handlePosting}
            >
              Post it!
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default PostingEdit;
