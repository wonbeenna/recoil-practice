import React, {ChangeEvent, useCallback, useState} from 'react';
import {ITodoItems, todosState} from "../recoil/todo";
import styled from "styled-components";
import {useRecoilState} from "recoil";

const TodoItem = ({id, content, isComplete}:ITodoItems) => {
    const [todos, setTodos] = useRecoilState<ITodoItems[]>(todosState)
    const [edit, setEdit] = useState<boolean>(false)
    const [editContent, setEditContent] = useState(content)
    const index = todos.findIndex((todo) => todo.id === id);

    const deleteHandler = useCallback((id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }, [setTodos, todos])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEditContent(e.target.value);
    }, [setEditContent]);

    const replaceItemIndex = (arr: ITodoItems[], index:number, newValue: ITodoItems) => {
        return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
    }

    const editHandler = useCallback(() => {
        const newTodo = replaceItemIndex(todos, index, {
            id,
            content: editContent,
            isComplete
        })

        setTodos(newTodo)
        setEdit(false)
    }, [todos, index, id, editContent, isComplete, setTodos])

    const checkItemCompletion = useCallback(() => {
        const newTodo = replaceItemIndex(todos, index, {
            id,
            content,
            isComplete: !isComplete,
        });

        setTodos(newTodo);
    }, [content, id, index, isComplete, setTodos, todos])

    return (
        <Todo>
            <input type='checkbox' checked={isComplete} onChange={checkItemCompletion} />
            {edit ?
                <div>
                    <input type='text' value={editContent} onChange={onChangeHandler}/>
                    <button onClick={editHandler}>edit</button>
                </div>
                : <div>{content}</div>}
            <Button>
                <button onClick={() => setEdit(!edit)}>{edit ? 'cancel' : 'edit'}</button>
                <button onClick={() => deleteHandler(id)}>delete</button>
            </Button>
        </Todo>
    );
};

export default TodoItem;

const Todo = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid deepskyblue;
  margin: 10px 0;
`

const Button = styled.div`
  display: flex;
  align-items: center;
`