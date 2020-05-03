"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Animal = /** @class */ (function () {
    function Animal(id, type) {
        this.id = id;
        this.type = type;
    }
    Animal.isAnimal = function (obj) {
        if (!Animal.prototype.isPrototypeOf(obj)) {
            return false;
        }
        return true;
    };
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name, breed) {
        var _this = _super.call(this, 1, 'cat') || this;
        _this._name = name;
        _this._breed = breed;
        return _this;
    }
    Cat.prototype.displayName = function () {
        console.log('Name: ' + this._name);
    };
    Cat.prototype.voice = function () {
        console.log('meow, meow');
    };
    Cat.prototype.print = function () {
        console.log('The cat ' + this._name + ' is a ' + this._breed);
    };
    Cat.isCat = function (obj) {
        return Animal.isAnimal(obj);
    };
    Cat = __decorate([
        sealed
    ], Cat);
    return Cat;
}(Animal));
var tom = new Cat('Tom', 'British Shorthair');
tom.displayName(); // "Tom"
tom.voice(); // console: "meow, meow"
tom.print(); //console: "The cat Tom is British Shorthair"
console.log(Cat.isCat(tom)); //true;
