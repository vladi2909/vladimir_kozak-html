function sealed(constructor: Function) {
    console.log('sealed decoration');
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

interface IAnimal {
    id: number;
    type: string;
}

class Animal implements IAnimal{
    
    constructor(public id: number, public type: string) {
    }

    static isAnimal(obj: object) {
        if( !Animal.prototype.isPrototypeOf(obj)) {
            return false;
        }
        return true;
    }
}

@sealed
class Cat extends Animal {

    private _name: string;
    private _breed: string;

    constructor(name: string, breed: string) {
        super(1, 'cat');
        this._name = name;
        this._breed = breed;
    }

    public displayName(): void {
        console.log('Name: ' + this._name);
    }

    public voice(): void {
        console.log('meow, meow');
    }

    public print(): void {
        console.log('The cat ' + this._name + ' is a ' + this._breed);
    }

    static isCat(obj: object) {
        return Animal.isAnimal(obj);
    }
}


var tom: Cat = new Cat('Tom', 'British Shorthair');
tom.displayName();       // "Tom"
tom.voice();    // console: "meow, meow"
tom.print();    //console: "The cat Tom is British Shorthair"
console.log(Cat.isCat(tom)); //true;
