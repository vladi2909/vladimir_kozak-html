class Animal {
    constructor(type) {
      this.type = type;
    }
  
    static isAnimal(obj, type) {
      if( !Animal.prototype.isPrototypeOf(obj) ) {
        return false;
      }
      return type ? obj.type === type : true;
    }
  }
  
  class Cat extends Animal {
    constructor(name, breed) {
      super("cat");
      this.name = name;
      this.breed = breed;
    }
  
    voice() {
      console.log("meow, meow");
    }
  
    print() {
      console.log("The cat " + this.name + " is a " + this.breed);
    }
  
    static isCat(obj) {
      return Animal.isAnimal(obj, "cat");
    }
  }
  
  var tom = new Cat("Tom", "British Shorthair");
  
  tom.name;    // "Tom"
  tom.breed;   // "British Shorthair"
  tom.voice();  // console: "meow, meow"
  tom.print(); // console: "The cat Tom is British Shorthair"
  
  Cat.isCat(tom); // true