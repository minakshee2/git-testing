import "./styles.css";
import { useState } from "react";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((currentList) => {
      return [
        ...currentList,
        {
          id: crypto.randomUUID(),
          title: newItem,
          completed: false,
        },
      ];
    });
    setNewItem("");
  };

  function toggleTodo(id, completed) {
    setTodos((currentList) => {
      return currentList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentList) => {
      return currentList.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="newitem">New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            id="newitem"
            name="newitem"
            type="text"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      {todos.length === 0 && "No item added yet"}
      <ul className="list">
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn.btn-danger"
              >
                {" "}
                Delete{" "}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
