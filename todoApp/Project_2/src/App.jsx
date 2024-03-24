import {useEffect, useState} from "react";
import "./styles.css"
import NewTodoForm from "./NewTodoForm.jsx";
import ToDoList from "./ToDoList.jsx";
function App(){

    // setNewItem("Hello")
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("ITEMS")
        if (localValue == null) return []

        return JSON.parse(localValue)
    })

    // Every time todos is changed
    useEffect(() => {
        localStorage.setItem("ITEMS", JSON.stringify(todos))
    }, [todos]);

    function addTodo(title){
        setTodos( (currentTodos) => {
            return [
                ...currentTodos,
                {
                    id: crypto.randomUUID(),
                    title: title,
                    completed: false
                }]
        })
    }

    function toggleTodo(id, completed){
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                if (todo.id === id){
                    return{ ...todo, completed}
                }

                return todo;
            })
        })
    }

    function deleteTodo(id){
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id)
        })
    }

    return(
        <>
            <NewTodoForm onSubmit={addTodo}/>
            <h1 className="header"> Todo List</h1>
            <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
        </>
    );
}

export default App