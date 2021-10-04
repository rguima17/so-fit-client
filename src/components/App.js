import { BrowserRouter, Route, Switch } from "react-router-dom";

import AuthRouter from "../routeComponents/auth/AuthRouter";
import { AuthContextComponent } from "../contexts/authContext";
import PrivateRoute from "../routeComponents/auth/PrivateRoute";

import Home from "../routeComponents/Home";
import Footer from "./structure/footer/Footer";
import NavRouter from "./structure/nav/NavRouter";
import Chronometer from "./chronometer/Chronometer";
import ChronometerTabata from "./chronometer/ChronometerTabata";

import WorkoutList from "../components/workout/WorkoutList";
import WorkoutDetail from "../components/workout/WorkoutDetail";
import WorkoutEdit from "./workout/WorkoutEdit";
import WorkoutDelete from "./workout/WorkoutDelete";
import WorkoutDone from "./workout/WorkoutDone";
import WorkoutDuplicate from "./workout/WorkoutDuplicate";

import ProfileDetail from "./userProfile/ProfileDetail";
import ProfileEdit from "./userProfile/ProfileEdit";
import PostingEdit from "./posting/PostingEdit";

import UserFeed from "./userFeed/UserFeed";
import ViewUser from "./userFeed/ViewUser";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <div id='main-container'>
          <NavRouter />
          <main id='site-content'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/auth' component={AuthRouter} />
              <Route path='/chronometer' component={Chronometer} />
              <Route path='/chronometer-tabata' component={ChronometerTabata} />

              {/* User related routes */}
              <PrivateRoute exact path='/profile' component={ProfileDetail} />
              <PrivateRoute
                exact
                path='/profile/edit/:id'
                component={ProfileEdit}
              />
              <PrivateRoute exact path='/user-feed' component={UserFeed} />
              <PrivateRoute exact path='/user/:id' component={ViewUser} />

              {/* Post related routes */}

              <Route exact path='/posting/edit/:id' component={PostingEdit} />

              {/* Workout related routes */}
              <PrivateRoute
                exact
                path='/workout/edit/:id'
                component={WorkoutEdit}
              />
              <PrivateRoute
                exact
                path='/workout/duplicate/:id'
                component={WorkoutDuplicate}
              />
              <PrivateRoute
                exact
                path='/workout/delete/:id'
                component={WorkoutDelete}
              />
              <PrivateRoute
                exact
                path='/workout/:id'
                component={WorkoutDetail}
              />
              <PrivateRoute exact path='/workout' component={WorkoutList} />
              <PrivateRoute
                exact
                path='/workout/:id/done/:points'
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
