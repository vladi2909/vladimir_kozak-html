import { Todo } from './todo';

export class TodoListSnapshot {
    constructor(
        public todoSearch: string,
        public isSortedByIncrease: boolean,
        public todoList: Todo[]
    ) { }

    public static fromJSON(json: any): TodoListSnapshot {
        return Boolean(json)
            ? new TodoListSnapshot(
                json.todoSearch,
                json.isSortedByIncrease,
                (json.todoList || []).filter(Boolean).map(Todo.fromJSON)
            )
            : null;
    }

    public static toJSON(uls: TodoListSnapshot): any {
        return Boolean(uls)
            ? {
                todoSearch: uls.todoSearch,
                isSortedByIncrease: uls.isSortedByIncrease,
                todoList: (uls.todoList || []).filter(Boolean).map(Todo.toJSON)
            }
            : {};
    }
}