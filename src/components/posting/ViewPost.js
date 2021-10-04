import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../apis/api";
import ViewPostCard from "./ViewPostCard";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { NavLink } from "react-router-dom";

function ViewPost() {
   
  const { loggedInUser } = useContext(AuthContext);

  const [post, setPost] = useState({
    name:"",
    createdDate:"",
    pictureUrl:"",
    description:"",
    likes:[],
    workoutId:{
        exercisesId:[]
    },
    workoutId:{}
  
  });

  const[exercises, SetExercises] =useState([])

  const { id } = useParams();

  useEffect(() => {
    
    async function fetchPost() {
      try {
        const response = await api.get(`/posting/${id}`);
       setPost({ ...response.data });
    
      
        let arr = []
        for(let i=0; i<response.data.workoutId.exercisesId.length;i++){
           arr.push (response.data.workoutId.exercisesId[i].exerciseName)
        }
          SetExercises([...arr])
       
      } catch (err) {
        console.error(err);
      }
    }
    fetchPost();
  }, [id]);
 



  //Follow user
//   async function handleFollow() {
//     try {
//       setbuttonClick(!buttonClick);
      
//       //Check if same User
//       if (loggedInUser.user._id === id) {
        
//         return null;
//       }

//       const profile = await api.get(`/user/view/${loggedInUser.user._id}`);

//       const followingArray = profile.data.followingId;

//       // Check if already follow user
//       for (let i = 0; i < followingArray.length; i++) {
//         if (followingArray[i] === id) {
         
//           return null;
//         }
//       }
//       await api.post(`/user/view/${id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   }

  //Unfollow User
//   async function handleUnfollow() {
//     try {
//       setbuttonClick(!buttonClick);
     
//       if (loggedInUser.user._id === id) {
       
//         return null;
//       }
//       await api.delete(`/user/view/${id}`);
   
//     } catch (err) {
//       console.error(err);
//     }
//   }


// return (
//     <div>OI</div>
// )
// }

  return (
    <div>
      <div className="flex justify-content-end mr-3">
        <NavLink
          to={`/user-feed`}
          className=" w-25 px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Back
        </NavLink>
      </div>
      <ViewPostCard
        name={post.name}
        createdDate={post.createdDate}
        pictureUrl={post.pictureUrl}
        description={post.description}
        likes={post.likes.length}
        exercises={exercises}
      />

     

      {/* {filteredPosts.map((post) => {
        return (
          <div key={post._id}>
            <PostSmallCard              
                id={post._id}
                name={post.name}
                pictureUrl={post.pictureUrl}
            />
          </div>
        );
      })} */}
  
    </div>
  );
}





export default ViewPost;
