import { useState, useEffect } from "react";
import { useParams, NavLink, useHistory} from "react-router-dom";


import api from "../../apis/api";

function PostingEdit() {

  const { id } = useParams();
  const history = useHistory()

  const [posting, setPosting] = useState({
      name:"",
      description:"",
      workoutId:"",
      postedBy:"",
      pictureUrl:"",
      userId: ""
  });

  function handleChange(event) {
    if (event.target.files) {
      // console.log("entrou");

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
        const response = await api.get(`/workout/${id}`)
        
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

 
  async function handlePosting(){
     try {

      if (posting.pictureUrl2) {
        const pictureUrl = await handleUpload(posting.pictureUrl2)
         await api.post(`/posting/${id}`, {...posting, pictureUrl})
        history.push("/profile")
      
      }else {
        await api.post(`/posting/${id}`, posting);
        history.push("/profile");
      }
    }
       catch (err) {
        console.error(err);
      }
  }

  return (
    <div>
      <h1>Posting Edit</h1>
      <div className="flex justify-content-end mr-3">
        <NavLink
          to={`/workout/${id}`}
          className=" w-25 px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Back
        </NavLink>
      </div>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-bold text-gray-700 capitalize dark:text-white">
          Posting Edit
        </h2>
       
          <div className="grid">
            <div className="mb-3">
              <label className="text-gray-700  font-semibold dark:text-gray-200 mb-1">
                Post Name:
              </label>

              <input
                type="text"
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                name="name"
                placeholder="The default is the Workout Name"
                onChange={handleChange}
                value={posting.name}
              />
            </div>
            <div className="mb-3">
              <label className="text-gray-700  font-semibold dark:text-gray-200 mb-1">
                {" "}
                Post Description:
              </label>
              <textarea
                maxLength="500"
                rows="3"
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                name="description"
                placeholder="The default is the Workout Description"
              
                onChange={handleChange}
                value={posting.description}
              ></textarea>
            </div>

            {/* <div className="mb-1">
              <label className="text-gray-700 font-semibold dark:text-gray-200 mb-1 ">
                Post Picture:
              </label>
              <input
                type="file"
                className="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                name="pictureUrl2"
                placeholder="Add a diffent picture"
              />
            </div> */}
          <div className="mb-1">
            <label className="text-gray-700 font-semibold dark:text-gray-200 mb-1 ">Picture:</label>
            <input
              type="file"
              className="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              name="pictureUrl2"
              placeholder="Change your picture"
              onChange={handleChange}
            />
          </div>



          </div>
          <div className="flex justify-content-end mr-3">
        <div
            onClick={handlePosting}   
         
            
          className=" w-25 px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Post
        </div>
      </div>
      </section>
    </div>
  );
}

export default PostingEdit;


 
    
 