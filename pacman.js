// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

// replace this comment with your four ghosts setup as objects
var ghosts = [inky, blinky, pinky, clyde];


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '\n');
  console.log('Power Pellets: ' + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellets > 0) {               // only displays p option of power-pellets available
    console.log('(p) Eat Power-Pellet');
  };
  if (ghosts[0].edible === true) {
    console.log('(1) Eat Inky (edible)');
  } else {
    console.log('(1) Eat Inky (inedible)');
    }
  if (ghosts[1].edible === true) {
    console.log('(2) Eat Blinky (edible)');
  } else {
    console.log('(2) Eat Blinky (inedible)');
  }
  if (ghosts[2].edible === true) {
    console.log('(3) Eat Pinky (edible)');
  } else {
    console.log('(3) Eat Pinky (inedible)');
    }
  if (ghosts[3].edible === true) {
    console.log('(4) Eat Clyde (edible)');
  } else {
    console.log('(4) Eat Clyde (inedible)');
  }
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'p':
      eatPowerPellet();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    case 'd':
      eatDot();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

function eatGhost(ghost) {
    if (ghost.edible === false && lives > 0) {
        lives--;
        console.log("\nThe " + ghost.colour + " ghost, " + ghost.name + ", ate Pac-Mac!");
    } else if (lives > 0 && ghost.edible === true){
        console.log("\nPac-Mac ate the " + ghost.character + " ghost, " + ghost.name + "!");
        score += 200;
        // score += ghostScoreValue
        // ghostScoreValue = ghostScoreValue * 2
        ghost.edible = false
    } else if (lives === 0) {
        process.exit();
    }
}

function eatPowerPellet() {
  if (powerPellets > 0) {
  powerPellets -= 1;
  score += 50;
    for (var i = 0; i <= 3; i++) {
      ghosts[i].edible = true;
    };
  }
  else {
    console.log('\n You have no Power-Pellets Left!');
  };
}

//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
