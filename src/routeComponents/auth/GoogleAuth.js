import React, { useState } from "react";
import GoogleLogin from "react-google-login";

export default function GoogleAuth() {
  const [email, setEmail] = useState();
  const [familyName, setFamilyName] = useState();
  const [givenName, setGivenName] = useState();
  const [googleId, setGoogleId] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [name, setName] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState();

  const responseGoogle = (response) => {
    console.log(response.profileObj);
    const {
      profileObj: { email, familyName, googleId, givenName, imageUrl, name },
    } = response;
    setEmail(email);
    setFamilyName(familyName);
    setGoogleId(googleId);
    setGivenName(givenName);
    setImageUrl(imageUrl);
    setName(name);
    setIsLoggedIn(true);
  };

  return (
    <div>
      <GoogleLogin
        className='w-full px-4 py-2 '
        clientId='434758658356-4idehe7irbrq7qofcevc285dc9t6cv88.apps.googleusercontent.com'
        buttonText='sigup with Google'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      {isLoggedIn ? (
        <div className='text-center'>
          <img
            className='profile'
            aria-hidden
            src={imageUrl}
            alt='Profile image'
          />
          <p>Email: {email}</p>
          <p>Family: {familyName}</p>
          <p>Name: {givenName}</p>
          <p>Google Id: {googleId}</p>
          <p>Full Name: {name}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
