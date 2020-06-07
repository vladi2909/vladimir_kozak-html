export class Todo {

    constructor(
        public id: number,
        public name: string,
        public isNew: boolean
    ) {}

    public static fromJSON(json: any): Todo {
        return Boolean(json)
            ? new Todo(json.id, json.name, json.isNew)
            : null;
    }

    public static toJSON(todo: Todo): any {
        return Boolean(todo)
            ? {
                id: todo.id,
                name: todo.name,
                isNew: todo.isNew
            }
            : {};
    }

    public equals(todo: Todo): boolean {
        return Boolean(todo)
            && this.id === todo.id
            && this.name === todo.name
            && this.isNew === todo.isNew 
    }

}
