import React, {
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useForm } from "../../../forms/useForm";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import firebaseAuth from "../../../assets/config/firebaseAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import of firebase package needed here to use Persistence.SESSION.
import firebase from "firebase/app";
import "firebase/auth";
import "./Login.scss";
import "./util.css";

// COMPONENT uses util.css for styling with class names.
const Login = () => {
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);
  // a reference to the alert DOM node.
  const alertRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  // Need it for redirecting.
  const history = useHistory();
  // currently logged in user.
  const { currentUser } = useContext(AuthContext);

  const [passwordShown, setPasswordShown] = useState(false);

  // Handles form input using a custom made useState hook.
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    showError: true,
    // Needed so the height of the alert box is not shrinked b/c of empty message
    // It affects container height size of the login form near the bottom.
    message: "PLACEHOLDER MESSAGE",
  });

  const handleLogin = useCallback(
    async (e) => {
      e.stopPropagation();
      e.preventDefault();

      try {
        await firebaseAuth
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(async () => {
            await firebaseAuth
              .auth()
              .signInWithEmailAndPassword(values.email, values.password)
              .then(async () => {
                // console.log("successful login");
              });
            // redirect to /admin page if login is successful otherwise an error is thrown and handled acoordingly.
            history.push("/admin");
          })
          .catch((error) => {
            // Error object has a code and a message with that code too.
            // Error.code, Error.message
            // Displays the error and hides it after 2 seconds.
            if (error.code == "auth/invalid-email") {
              setErrorMsg({ showError: true, message: "Email is invalid" });
              alertRef.current.style.visibility = "visible";
              setTimeout(
                () => (alertRef.current.style.visibility = "hidden"),
                2000
              );
            } else if (error.code == "auth/user-disabled") {
              setErrorMsg({ showError: true, message: "User disabled" });
              alertRef.current.style.visibility = "visible";
              setTimeout(
                () => (alertRef.current.style.visibility = "hidden"),
                2000
              );
            } else if (error.code == "auth/user-not-found") {
              setErrorMsg({ showError: true, message: "User does not exist" });
              alertRef.current.style.visibility = "visible";
              setTimeout(
                () => (alertRef.current.style.visibility = "hidden"),
                2000
              );
            } else if (error.code == "auth/wrong-password") {
              setErrorMsg({
                showError: true,
                message: "Password is incorrect",
              });
              alertRef.current.style.visibility = "visible";
              setTimeout(
                () => (alertRef.current.style.visibility = "hidden"),
                2000
              );
            }

            // console.log(error);
          });
      } catch (error) {
        throw error;
      }
    },
    [values, handleChange]
  );

  const togglePassword = (e) => {
    e.preventDefault();

    if (passwordRef.current.getAttribute("type") === "password") {
      // show password icon - fa eye slash
      setPasswordShown(true);
      passwordRef.current.setAttribute("type", "text");
      // console.log('show pass')
    } else if (passwordRef.current.getAttribute("type") === "text") {
      // show text icon fa eye
      setPasswordShown(false);
      passwordRef.current.setAttribute("type", "password");
      // console.log('hide pass')
    }
  };

  // Prevent the login page from rendering before the redirect because the component renders before data (currentUser object) is loaded in.
  if (!!sessionStorage.getItem("loggedInUser") == true && currentUser == null) {
    return null;
  }

  // Redirect user back to homepage if they are logged in already.
  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div id="login-container" className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form
              onSubmit={handleLogin}
              className="login100-form validate-form p-l-55 p-r-55 p-t-178"
            >
              <span className="login100-form-title">
                Hockeypool Admin Portal
              </span>

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Please enter email"
              >
                <input
                  className="input100"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                  ref={emailRef}
                />
                <span className="focus-input100"></span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Please enter password"
              >
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  ref={passwordRef}
                />
                <span className="focus-input100"></span>
                {passwordShown ? (
                  <FontAwesomeIcon
                    onClick={togglePassword}
                    id="displayPassword"
                    icon={faEye}
                  />
                ) : (
                  <FontAwesomeIcon
                    onClick={togglePassword}
                    id="displayPassword"
                    icon={faEyeSlash}
                  />
                )}
              </div>

              <div className="container-login100-form-btn p-b-30 p-t-50">
                <button type="submit" className="login100-form-btn">
                  Login
                </button>
                {
                  <div
                    ref={alertRef}
                    className="alert alert-danger show fade m-t-35 m-b-35"
                    role="alert"
                  >
                    {errorMsg.message}
                  </div>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
