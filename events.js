var event = require('events');
var util = require('util');

var Person = function(name){
  this.name = name;
}


util.inherits(Person, event.EventEmitter)

let nomi = new Person('nouman');
let phalli = new Person('farhan');
let sabi = new Person('saba');


let people = [nomi,phalli,sabi];
people.forEach((item) => {
  item.on('speak',(msg)=>{
    console.log(`${item.name} said ${msg}`);
  })
});



nomi.emit('speak','hello');
phalli.emit('speak','hello');
