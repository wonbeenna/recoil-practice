import React from 'react';
import TodoItem from "./TodoItem";
import {useRecoilValue} from "recoil";
import {todoStatsState} from "../recoil/todo";
import styled from "styled-components";
import TodoInput from "./TodoInput";

const TodoList = () => {
    // atom
    // const [todos] = useRecoilState<ITodoItems[]>(todosState)
    // or
    // selector
    const {
        todoList,
        totalNum,
    } = useRecoilValue(todoStatsState);

    return (
        <Todos>
            <div className='todo_list'>
            <div>총 {totalNum} 개</div>
                {todoList.length > 0 && todoList?.map(({id,  content, isComplete}) => (
                    <TodoItem key={id} id={id} content={content} isComplete={isComplete} />
                ))}
            </div>
            <TodoInput />
        </Todos>
    );
};

export default TodoList;

const Todos = styled.div`
  width: 500px;
  height: 500px;
  max-height: 500px;
  border: 1px solid skyblue;
  border-radius: 10px;
  margin: auto;
  padding: 1.5rem;
  list-style: none;
  
  .todo_list{
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .todo_input{
    display: flex;
    justify-content: space-between;
    
    & > input{
      width: 100%;
    }
  }
`