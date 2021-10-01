import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthRouter from "../routeComponents/auth/AuthRouter";
import { AuthContextComponent } from "../contexts/authContext";
import PrivateRoute from "../routeComponents/auth/PrivateRoute";

import Home from "../routeComponents/Home";
import Footer from "./structure/footer/Footer";

import WorkoutList from "../components/workout/WorkoutList";
import WorkoutDetail from "../components/workout/WorkoutDetail";
import WorkoutEdit from "./workout/WorkoutEdit";

import ProfileDetail from "./userProfile/ProfileDetail";
import ProfileEdit from "./userProfile/ProfileEdit";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        {/* <Navbar />  NILTON */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={AuthRouter} />

          <PrivateRoute exact path="/profile" component={ProfileDetail} />
          <PrivateRoute
            exact
            path="/profile/edit/:id"
            component={ProfileEdit}
          />
          <PrivateRoute
            exact
            path="/workout/edit/:id"
            component={WorkoutEdit}
          />
          <PrivateRoute exact path="/workout/:id" component={WorkoutDetail} />
          <PrivateRoute exact path="/workout" component={WorkoutList} />
        </Switch>
        <Footer /> {/* NILTON  */}
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
