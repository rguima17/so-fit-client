import AllUsers from "./AllUsers";
import UserFollowing from "./UserFollowing";
import UserPosts from "../posting/UserPosts";
import FollowingPosts from "../posting/FollowingPosts";

function UserFeed() {
   
   return (
       <div>
          <h2> User Feed</h2>
          <AllUsers />
          < UserFollowing />
         <UserPosts/>
         <FollowingPosts />


           </div>
   )
}

export default UserFeed

