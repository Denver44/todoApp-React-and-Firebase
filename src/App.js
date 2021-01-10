import React, { useEffect } from "react";
import Login from "./Login.jsx";
import Todo from "./Todo";
import "./Todo.css";
import "./Login.css";
import { auth } from "./firebase";
import { selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return <div className="App">{user ? <Todo /> : <Login />}</div>;
}

export default App;
