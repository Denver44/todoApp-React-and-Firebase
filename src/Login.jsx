import React, { useState } from "react";
import { auth } from "./firebase";
import image from "./Images/signin-image.jpg";
import Button from "@material-ui/core/Button";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      alert(error.message);
    });
  };

  const register = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      alert(error.message);
    });
  };

  return (
    <div className="Login">
      <div className="login__Singup">
        <div className="login__image">
          <img className="img" src={image} alt="signup_image" />
        </div>
        <div className="login__container">
          <h2>Sign up</h2>
          <form>
            <div className="Input__field">
              <i className="fa fa-user fa-lg icons "></i>
              <input
                className="Input__Details"
                placeholder="Enter Your email"
                type="text"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="Input__field">
              <i className="fa fa-key fa-lg icons"></i>
              <input
                className="Input__Details"
                placeholder="Enter Your password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="login__signInButton"
              onClick={signIn}
            >
              Sign in
            </Button>
            <div className="checkbox__style">
              <input type="checkbox" defaultChecked />
              <div className="innertems">
                <p className="termscondition">
                  I agree all statements in
                  <span className="termscondition tc">Terms of service</span>
                </p>
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={register}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
