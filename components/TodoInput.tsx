import React, {ChangeEvent, useCallback} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {inputState, ITodoItems, todosState} from "../recoil/todo";

const TodoInput = () => {
    const [content, setContent] = useRecoilState<string>(inputState);

    const todos = useRecoilValue<ITodoItems[]>(todosState);
    const setTodos = useSetRecoilState<ITodoItems[]>(todosState);

    const addTodoHandler = useCallback(() => {
        if(!content){
            return;
        }

        const newTodo: ITodoItems = {
            id: todos[todos.length - 1].id + 1,
            content,
            isComplete: false
        }

        setTodos([...todos, newTodo])
        setContent('')
    }, [content, setContent, setTodos, todos])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }, [setContent]);

    return (
        <div className='todo_input'>
            <input type='text' value={content} onChange={onChangeHandler} />
            <button onClick={addTodoHandler}>Submit</button>
        </div>
    )
};

export default TodoInput;