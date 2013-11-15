/**
 * Examples of operations
 */

// Refinement
var person = {
    "first-name": 'Luis',
    "lastName": 'Montealegre',
    'sons': ['Mario', 'Alejandro']
};

person.lastName; // Montealegre
person['first-name']; // Luis
person.sons[0]; // Mario

// Invocation
var multiply = function(a, b) {
    return a * b;
};

multiply(2, 5); // 10

// Unary operations
delete person.lastName; // Remove property lastName from person
number = new Number(2); // Creates a new Number instance
typeof number; // Number

var isValid = false;
!isValid; //true

// Arithmetic operations
var multiplication = 2 * 3; // 6
var division = 6 / 2; // 3
var modulo = 10 % 3; // 1
var addition = 2 + 9; // 11
var subtraction = 10 - 20; // -10

// Inequality
2 >= 5; //false
3 <= 17; //true
112 > 53; //true
56 < 89; // true

// Equality (strict)
'1' === 1; // false
3 !== 3; // true

// Logical (short circuit)
3 > 4 || 5 !== '5'; //Logical or: true
5 > 2 && '' === 0; // Logical and: false

// Ternary
var lastName = person.lastName ? person.lastName : 'Unknown';  // Unknown
