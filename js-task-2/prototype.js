function Animal(type) {
    this.type = type;
  }

  Animal.isAnimal = function(obj, type) {
    if( !Animal.prototype.isPrototypeOf(obj) ) {
      return false;
    }
    return type ? obj.type === type : true;
  };
  
  function Cat(name, breed) {
    Animal.call(this, "cat");
    this.name = name;
    this.breed = breed;
  }

  Object.setPrototypeOf(Cat.prototype, Animal.prototype);
  Cat.prototype.voice = function() {
    console.log("meow, meow");
  };

  Cat.prototype.print = function() {
    console.log("The cat " + this.name + " is a " + this.breed);
  };
  
  Cat.isCat = function(obj) {
    return Animal.isAnimal(obj, "cat");
  };

var tom = new Cat("Tom", "British Shorthair");

tom.name;    // "Tom"
tom.breed;   // "British Shorthair"
tom.voice();  // console: "meow, meow"
tom.print(); // console: "The cat Tom is a British Shorthair"

Cat.isCat(tom); // true