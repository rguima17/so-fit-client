import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";

import NavBarOffline from "./NavBarOffline";
import NavBarOnline from "./NavbarOnline";

function NavRouter() {
  const { loggedInUser } = useContext(AuthContext);
  return loggedInUser.user._id ? <NavBarOnline /> : <NavBarOffline />;
}

export default NavRouter;
