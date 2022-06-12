import {atom, selector} from "recoil"

export interface ITodoItems{
    id: number;
    content: string;
    isComplete: boolean;
}

export const inputState = atom<string>({
    key: 'inputState',
    default: '',
})

export const todosState = atom<ITodoItems[]>({
    key: 'todos',
    default: [
        {
            id: 1,
            content: 'recoil',
            isComplete: false
        },
        {
            id: 2,
            content: 'recoil',
            isComplete: false
        },
        {
            id: 3,
            content: 'recoil',
            isComplete: false
        }
    ],
});

export const todoStatsState = selector({
    key:' todosListStatsState',
    get: ({get}) => {
        const todoList = get(todosState)
        const totalNum = todoList.length

        return {
            todoList,
            totalNum
        }
    }
})