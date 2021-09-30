import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center">
      <img
        src="https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/84/original/logo-ironhack-blue.png"
        alt="ironhack logo"
      />
      <h1>So Fit</h1>
      <p>Your fitness social network. Finally! </p>
      <div className="d-flex flex-column align-items-center">
        <Link className="btn btn-lg btn-primary" to="/auth/signup">
          Signup here!
        </Link>
      </div>
    </div>
  );
}

export default Home;
