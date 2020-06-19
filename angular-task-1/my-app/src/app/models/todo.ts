export class Todo {
    constructor(
        public id: number,
        public name: string,
        public completed: boolean,
        public date: Date
    ) { }

    public static fromJSON(json: any): Todo {
        return Boolean(json)
            ? new Todo(json.id, json.name, json.completed, json.date)
            : null;
    }

    public static toJSON(todo: Todo): any {
        return Boolean(todo)
            ? {
                id: todo.id,
                name: todo.name,
                completed: todo.completed,
                date: todo.date
            }
            : {};
    }

    public equals(todo: Todo): boolean {
        return Boolean(todo)
            && this.id === todo.id
            && this.name === todo.name
            && this.completed === todo.completed
            && this.date === todo.date;
    }

}
