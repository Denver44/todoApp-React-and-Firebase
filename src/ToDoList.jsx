import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const ToDoList = (props) => {
  return (
    <>
      <div className="todo_style">
        <DeleteForeverIcon
          className="fa-times"
          onClick={() => {
            props.onSelect(props.todo.id);
          }}
        />
        <li>{props.todo.items}</li>
      </div>
    </>
  );
};

export default ToDoList;

// using props we access our own madeup attributes like id,key,nSelect and text.
