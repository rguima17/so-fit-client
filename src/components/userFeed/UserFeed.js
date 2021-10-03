import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../apis/api";
import AllUsers from "./AllUsers";

function UserFeed() {
   
   return (
       <div>
          <h1> User Feed</h1>
          <AllUsers />
           </div>
   )
}

export default UserFeed

