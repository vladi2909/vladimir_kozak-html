var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function sealed(constructor) {
    console.log('sealed decoration');
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
class Animal {
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }
    static isAnimal(obj) {
        if (!Animal.prototype.isPrototypeOf(obj)) {
            return false;
        }
        return true;
    }
}
let Cat = class Cat extends Animal {
    constructor(name, breed) {
        super(1, 'cat');
        this._name = name;
        this._breed = breed;
    }
    displayName() {
        console.log('Name: ' + this._name);
    }
    voice() {
        console.log('meow, meow');
    }
    print() {
        console.log('The cat ' + this._name + ' is a ' + this._breed);
    }
    static isCat(obj) {
        return Animal.isAnimal(obj);
    }
};
Cat = __decorate([
    sealed
], Cat);
var tom = new Cat('Tom', 'British Shorthair');
tom.displayName();
tom.voice();
tom.print();
console.log(Cat.isCat(tom));
//# sourceMappingURL=index.js.map