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

// switch
var level = 'expert';
switch (level) {
    case 'beginner':
        // sentences
        break;
    case 'intermediate':
        // sentences
        break;
    case 'advanced':
        // sentences
        break;
    case 'expert':
        //sentences
        break;
    default:
        //sentences
}

// while
var questionsCounter = 0;
var totalQuestions = 10;
while (questionsCounter < totalQuestions) {
    // sentences
    questionsCounter++;
}

// do-while
var answer = false;
do {
    //sentences
    answer = confirm('Do you want to continue?');
} while (answer);

// for
var i;
var count = 6;
for (i = 0; i < count; i += 1) {
  //sentences
}

// for in
var property;
for (property in user) {
    document.writeln(property);
}

// try/catch
try {
    //sentences
} catch(error) {
    document.writeln(error.message);
}
