import { BrowserRouter, Route, Switch } from "react-router-dom";

import AuthRouter from "../routeComponents/auth/AuthRouter";
import { AuthContextComponent } from "../contexts/authContext";
import PrivateRoute from "../routeComponents/auth/PrivateRoute";

import Home from "../routeComponents/Home";
import Footer from "./structure/footer/Footer";
import NavRouter from "./structure/nav/NavRouter";
import ChronometerPage from "./chronometer/ChronometerPage";
import About from "../routeComponents/About";

import WorkoutList from "../components/workout/workoutList/WorkoutList";
import WorkoutDetail from "../components/workout/WorkoutDetail";
import WorkoutEdit from "./workout/WorkoutEdit";
import WorkoutDelete from "./workout/WorkoutDelete";
import WorkoutDone from "./workout/WorkoutDone";
import WorkoutDuplicate from "./workout/WorkoutDuplicate";

import ProfileDetail from "./userProfile/ProfileDetail";
import ProfileEdit from "./userProfile/ProfileEdit";
import PostingEdit from "./posting/PostingEdit";
import ViewPost from "./posting/ViewPost";
import UserPosts from "./posting/UserPosts.js";
import LikedPosts from "./posting/LikedPosts";

import UserFeed from "./userFeed/UserFeed";
import ViewUser from "./userFeed/ViewUser";
import AllUsers from "./userFeed/AllUsers";
import UserFollowing from "./userFeed/UserFollowing";
import UserFollowers from "./userFeed/UserFollowers";
import SpecificUserPosts from "./posting/SpecificUserPosts";

import PointsLeaderboard from "./leaderboards/PointsLeaderboard";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <div id="main-container">
          <NavRouter />
          <main id="site-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/auth" component={AuthRouter} />

              {/* chronometers */}
              <Route path="/chronometer" component={ChronometerPage} />
              <Route path="/about" component={About} />

              {/* User related routes */}
              <PrivateRoute exact path="/profile" component={ProfileDetail} />
              <PrivateRoute
                exact
                path="/profile/edit/:id"
                component={ProfileEdit}
              />
              <PrivateRoute exact path="/user-feed" component={UserFeed} />
              <PrivateRoute exact path="/user/:id" component={ViewUser} />
              <PrivateRoute exact path="/all-users" component={AllUsers} />
              <PrivateRoute
                exact
                path="/user-following"
                component={UserFollowing}
              />
                <PrivateRoute
                exact
                path="/user-followers"
                component={UserFollowers}
              />

              {/* Post related routes */}
              <PrivateRoute
                exact
                path="/posting/edit/:id"
                component={PostingEdit}
              />
              <PrivateRoute exact path="/post/:id" component={ViewPost} />
              <PrivateRoute exact path="/your-posts" component={UserPosts} />
              <PrivateRoute exact path="/liked-posts" component={LikedPosts} />
              <PrivateRoute exact path="/posts/users/:id" component={SpecificUserPosts} />

              {/* Leaderboard related routes */}
              <Route
                exact
                path="/points-leaderboard"
                component={PointsLeaderboard}
              />

              {/* Workout related routes */}
              <PrivateRoute
                exact
                path="/workout/edit/:id"
                component={WorkoutEdit}
              />
              <PrivateRoute
                exact
                path="/workout/duplicate/:id"
                component={WorkoutDuplicate}
              />
              <PrivateRoute
                exact
                path="/workout/delete/:id"
                component={WorkoutDelete}
              />
              <PrivateRoute
                exact
                path="/workout/:id"
                component={WorkoutDetail}
              />
              <PrivateRoute exact path="/workout" component={WorkoutList} />
              <PrivateRoute
                exact
                path="/workout/:id/done/:points"
                component={WorkoutDone}
              />
            </Switch>
          </main>
          <Footer />
        </div>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
