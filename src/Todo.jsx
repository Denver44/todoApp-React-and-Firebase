import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList";
import { Button } from "@material-ui/core";
import db from "./firebase";
import firebase from "firebase";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import { auth } from "./firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Todo = () => {
  const user = useSelector(selectUser);
  const [items, setitems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    var unsubscribe = db
      .collection("todos")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setitems(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            items: doc.data().task,
            userid: doc.data().userid,
          }))
        );
      });
    return () => {
      unsubscribe();
    };
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    if (input.length > 0) {
      db.collection("todos").add({
        task: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userid: user.uid,
      });
    }
    setInput("");
  };

  const deleteItem = (id) => {
    db.collection("todos").doc(id).delete();
  };

  const filteredData = items.filter((items) => items.userid === user.uid);
  // console.log(filteredData);

  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <div className="main__heading">
            <div className="Todo__heading">
              <ExitToAppIcon
                onClick={() => auth.signOut()}
                fontSize="large"
                className="Heading__Icon"
              />
              <div className="Heading__display">
                <span className="Todo_DisplayName">
                  {user.email.split("@", 1)}
                </span>
                <span className="Todo_DisplayName">Todo's</span>
              </div>
            </div>
          </div>
          <form className="form__inputbutton">
            <input
              type="text"
              placeholder=" ✅ write a todo"
              onChange={(event) => setInput(event.target.value)}
              value={input}
            />
            <Button type="submit" onClick={addTodo}>
              +
            </Button>
          </form>
          <ul>
            {filteredData.map((element, index) => {
              return (
                <ToDoList todo={element} key={index} onSelect={deleteItem} />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todo;
// This index is the index of element which is inbuilt in map function.
// Element contain two things first id and one is item.
// filter(user.uid === items.userid)
