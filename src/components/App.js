import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../routeComponents/Home";
import AuthRouter from "../routeComponents/auth/AuthRouter";

import { AuthContextComponent } from "../contexts/authContext";
import PrivateRoute from "../routeComponents/auth/PrivateRoute";

import WorkoutList from "../components/workout/WorkoutList";
import WorkoutDetail from "../components/workout/WorkoutDetail";

import Footer from "./structure/footer/Footer";
import WorkoutEdit from "./workout/WorkoutEdit";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        {/* <Navbar />  NILTON */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={AuthRouter} />
        </Switch>
        <PrivateRoute exact path="/workout/edit/:id" component={WorkoutEdit} />
        <PrivateRoute exact path="/workout/:id" component={WorkoutDetail} />
        <PrivateRoute exact path="/workout" component={WorkoutList} />
        <Footer /> {/* NILTON  */}
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
