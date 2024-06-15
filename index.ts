#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// game variable
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"]
let maxEnemyHealth = 75
let enemyAttackDamageToHero = 25

// player variable

let heroHealth = 100
let attackDamageToEnemy = 50
let numHealthPotion = 3
let healthPotionHealAmount = 30
let healthPotionDropChance = 50

// while loop condition

let gameRunning = true

console.log(chalk.yellow.italic.bold("\tWelcome to Battle Zone"));
console.log(chalk.red.italic.bold("\t  Adventure Game!\n"));


Game:
while(gameRunning) {
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1)
    let enemyIndex = Math.floor(Math.random() * enemies.length)
    let enemy = enemies[enemyIndex]

    console.log(chalk.bold.cyan(`# ${enemy} has appeared #\n`));
    
    while (enemyHealth > 0){
        console.log(chalk.green(`Your Health: ${heroHealth}`));
        console.log(chalk.greenBright(`${enemy} Health: ${enemyHealth}`));

        let option = await inquirer.prompt({
            name: "ans",
            type: "list",
            message: "what would you like to do?",
            choices: ["1. Attack", "2. Take Health potion", "3. Run"]
        })

        if (option.ans === "1. Attack") {
            let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1)
            let damageToHero  =  Math.floor(Math.random() * enemyAttackDamageToHero + 1)

            enemyHealth -= damageToEnemy
            heroHealth -= damageToHero

            console.log(chalk.yellow(`you strike the ${enemy} for ${damageToEnemy} damage.`));
            console.log(chalk.yellow(`${enemy} strike you for ${damageToHero} damage.\n`));

            if(heroHealth < 1){
                console.log(chalk.redBright("you have take in too much damage. you are too weak to continue."));
                break;
            }
            
        }

        else if(option.ans === "2. Take Health potion"){
            if(numHealthPotion > 0){
                heroHealth += healthPotionHealAmount
                numHealthPotion--

                console.log(chalk.magentaBright(`you use health potion for ${healthPotionHealAmount}`));
                console.log(chalk.magentaBright(`you now have ${heroHealth} health`));
                console.log(chalk.magentaBright(`you have ${numHealthPotion} health potion left.\n`));
                
            }else{
                console.log(chalk.red(`you have no health potion left. defeat enemy for a chance get health potion.`));
                
            }
        }
        else if (option.ans ==="3. Run"){
            console.log(chalk.red(`you run away from ${enemy}`));
            continue Game;
        }

    } 
    if (heroHealth < 1){
        console.log(chalk.red(`you are out from battale. you are too weak.`));
        break
        
    }   
    console.log(chalk.magenta(`${enemy} was defeated!`));
    console.log(chalk.yellow(`you have ${heroHealth} health.`));

    let randomNumber = Math.floor(Math.random() * 100 + 1)
    if(randomNumber < healthPotionDropChance){
        numHealthPotion++

        console.log(chalk.magenta(`\nenemy give you health potion`));
        console.log(chalk.magenta(`your health is ${heroHealth}`));
        console.log(chalk.magenta(`your health potion is ${numHealthPotion}`));
    }
    
    let userOption = await inquirer.prompt({
        name: "ans",
        type: "list",
        message: "what would you like to do?",
        choices: ["1. Continue" , "2. Exit"]
    })
    
    if (userOption.ans === "1. Continue") {
        console.log(chalk.green("you are continue your adventure"));
        
    } else {
        console.log(chalk.green("You successfully Exit\n"));
        console.log(chalk.bold.italic.magenta("\tThank you for playing!\t "));
        break;
    }
}
