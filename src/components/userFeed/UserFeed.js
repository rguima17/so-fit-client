// import UserFollowing from "./UserFollowing";
import UserPosts from "../posting/UserPosts";
import FollowingPosts from "../posting/FollowingPosts";
import LikedPosts from "../posting/LikedPosts";

function UserFeed() {
  return (
    <div>
      <h2> User Feed</h2>
      {/* <UserFollowing /> */}
      <UserPosts />
      <FollowingPosts />
      <LikedPosts />
    </div>
  );
}

export default UserFeed;
