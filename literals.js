/**
 * Examples of literal values
 */

// Strings
var name = "Luis";
var lastName = 'Montealegre V\u00e1zquez'; //Montealegre Vázquez

// Numbers
var age = 33;
var salary = 5000.20; // :(
var distance = 12e2; // 1200

// Arrays
var names = ['Mario', 'Alejandro'];

// Objects
var person = {
    fullName: 'Luis Montealegre',
    age: 33,
    sons: ['Mario', 'Alejandro']
};

// Functions
var greet = function(name) {
    return 'Hello ' + name;
};