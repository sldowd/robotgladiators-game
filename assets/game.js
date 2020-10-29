//Game States
//"WIN" - Player has defeated all enemy-robots
//  * Fight all enemy robots
//  * Defeat each enemy-robot
// "LOSE" Player robot's health is zero or less
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;




//fight function defined here
var fight = function (enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
        // ask player if they'd liked to fight or run
        var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            //code to prompt store

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + ' has decided to skip this fight. Goodbye!');
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney)
                break;
            }
        }

        // remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + ' has died!');

            // award player money for winning
            playerMoney = playerMoney + 20;
            //code to prompt store

            // leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
        }

        // remove players's health by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
        );

        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + ' has died!');
            // leave while() loop if player is dead
            break;
        } else {
            window.alert(playerName + ' still has ' + playerHealth + ' health left.');
        }
    }
};

// function to start new game
var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
for (var i = 0; i < enemyNames.length; i++) {
    console.log(playerHealth);
    if (playerHealth > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        //pick new enemy based on the index of the enemyNames array
        var pickedEnemyName = enemyNames[i];

        //reset enemy health before starting new fight
        enemyHealth = 50;

        //used debugger to pause script from running and check whats going on
        //debugger;

        //pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyName);

        //if we're not at the last enemy in the array we can shop
        if (playerHealth > 0 && i < enemyNames.length - 1) {
            //ask if player wants to shop before next round
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

            //if yes, take them to the store() function
            if (storeConfirm) {
                shop();
            }
        }
    }
    if (playerHealth <= 0) {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
}
    //play again
    endGame();
};
var endGame = function() {
    //if player is still alive, player wins!
    if (playerHealth > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        //restartgame
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!")
    }
};
var shop = function() {
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'refill', 'upgrade', or 'leave' to make a choice."
        );

        switch(shopOptionPrompt) {
            case "REFILL": 
            case "refill":

                if (playerMoney >= 7) {
                    window.alert("Refilling player's health by 20 for 7 dollars.");
                    //increase health and decrease money
                    playerHealth = playerHealth + 20;
                    playerMoney = playerMoney - 7;
                }
                else {
                    window.alert("You don't have enough money!");
                }

                break;
            case "UPGRADE":
            case "upgrade":

                if (playerMoney >= 7) {
                    window.alert("Upgrading player's attack by 6 for 7 dollars.");
                    //increase attack and decrease money
                    playerAttack = playerAttack + 6;
                    playerMoney = playerMoney - 7;
                }
                else { 
                    window.alert("You don't have enough money!");
                }
                break;
            case "LEAVE":
            case "leave":
                window.alert("Leaving the store.");
                //function ends
                break;
            default:
                window.alert("You did not pick a valid option. Try again.");
                //call shop() again to force player to pick a valid option
                shop();
                break;
        }
}
//call startGame so game starts when page loads
//this should stay at the bottom of the page!
startGame();

//write endGame()
//--alert player of their status
//--ask if they want to play again
//--initiate startGame()

//After skip or battle win (and there are more enemies left)
//--ask player if they want to shop
//--if no continue as normal
//--if yes call shop()

//shop()
//--ask if player wants to refill health, upgrade attack, or leave the shop
//--if refill, subtract money and increase health
//--if upgrade, subtract money and increase attack
//--if leave, alert goodbye and exit fucntion
//--if any other invalid option call shop again