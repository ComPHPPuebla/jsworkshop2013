/**
 * Control structures
 */

var user = {
    username: 'luis',
    role: 'admin'
};

// if
var isAllowed = false;
if (user.role === 'admin') {
    isAllowed = true;
}

// if - else
var a = 1;
var b = 3;
var c = -3;
var max;
if (a > b) {
    if (a > c) {
        max = a;
    } else {
        max = c;
    }
} else {
    if (b > c) {
        max = b;
    } else {
        max = c;
    }
}