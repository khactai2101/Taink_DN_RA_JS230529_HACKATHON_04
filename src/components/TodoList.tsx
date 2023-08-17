import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import "../App.css";

//
// dinh nghia kieu du lieu cho moi cong viec
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

//component
const TodoList: React.FC = () => {
  //   state de luu danh sach cac cong viec
  const [todos, setTodos] = useState<Todo[]>([]);

  //
  // add cong viec moi'
  const handleAddTodo = (todoText: string) => {
    if (todoText.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };

    //  setTodos de cap nhat danh sach cong viec
    setTodos([...todos, newTodo]);
  };

  // xoa
  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // xu ly form dc gui di
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const todoText = (event.target as HTMLFormElement).todoText.value;
    handleAddTodo(todoText);
    (event.target as HTMLFormElement).reset();
  };

  //thay doi chu~ gach chan
  const changeStatus = (id: number) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="wrapper">
      <div className="header">
        <h1>Todo List</h1>
        <p>Get things done, one item at a time</p>
        <hr />
      </div>
      <div className="main">
        {/* hien thi list cong viec khi dc them moi' vao` */}
        {todos.map((todo) => (
          <div key={todo.id} className="item container">
            <p className={todo.completed ? "text" : ""}>{todo.text}</p>
            <div className="action">
              <input type="checkbox" onClick={() => changeStatus(todo.id)} />
              <BsTrash
                className="icon-trash"
                onClick={() => handleDeleteTodo(todo.id)}
              />
            </div>
          </div>
        ))}

        <div className="form-add container">
          <form onSubmit={handleSubmit}>
            <p>Add to the Todo List</p>
            <div className="input-add">
              <input type="text" name="todoText" />
              <button type="submit">Add item</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
