import styles from "./Todolist.module.css"
import { TiDeleteOutline } from 'solid-icons/ti'
import { createStore } from "solid-js/store"

function TodoList() {
    let input;
    const addTodo = (input) => {
        const title = input.value;
        if (!title.trim()) return;
        setTodos({
            objects: [{ text: title, id: todos.counter }, ...todos.objects],
            counter: todos.counter + 1
        });
        input.value = "";
    }


    const deleteTodo = (output) => {
        setTodos('objects', (t) => t.filter((object) => object.id !== output))
    }
    const [todos, setTodos] = createStore({
        objects: [],
        counter: 0,
    })
    return (
        <>
            <div class={styles.container}>
                <input type="text" ref={input} 
                    placeholder="What do you have in mind today?" name="todo"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addTodo(input);
                        }
                    }}>
                </input>
                <ul class={styles.todoList}>
                    <For each={todos.objects}>{(todo) =>
                        <li>
                            <div class={styles.todoItem}>
                                {todo.text}
                                <TiDeleteOutline onClick={() => {
                                    deleteTodo(todo.id)}}></TiDeleteOutline>
                            </div>
                        </li>
                    }
                    </For>
                </ul>
            </div>
        </>
    );
}
export default TodoList

  