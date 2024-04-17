#! /usr/bin/env node

import inquirer from "inquirer";

let accountBalance = 100000; // account balance
const pinCode = 1290; // pin code

let pinAnswer = await inquirer.prompt({
  name: "pin",
  type: "number",
  message: "Please enter your PIN code",
});

// pin verification
if (pinAnswer.pin === pinCode) {
  console.log("You have entered correct PIN code");

  // operation selection
  const operationAnswer = await inquirer.prompt([
    {
      name: "operation",
      type: "list",
      message: "Please select an operation",
      choices: ["Withdraw", "Fast cash", "Check balance"],
    },
  ]);
  // operating withdraw
  if (operationAnswer.operation === "Withdraw") {
    const withdrawAmount = await inquirer.prompt([
      {
        name: "amount",
        type: "number",
        message: "Please enter the amount to withdraw from the account",
      },
    ]);
    if (withdrawAmount.amount <= accountBalance) {
      accountBalance -= withdrawAmount.amount;
      console.log(
        `Transaction successfull, Your remaining amount is ${accountBalance}`
      );
    } else {
      console.log("Your balance is insufficient");
    }
    // operating fast cash
  } else if (operationAnswer.operation === "Fast cash") {
    const fastCashAmount = await inquirer.prompt([
      {
        name: "fastCash",
        type: "list",
        message: "Please select your cash amount to withdraw from your account",
        choices: ["1000", "2000", "4000", "8000"],
      },
    ]);
    if (fastCashAmount.fastCash <= accountBalance) {
      accountBalance -= fastCashAmount.fastCash;
      console.log(
        `Transaction successfull, Your remaining acount balance is ${accountBalance}`
      );
    }
  }
  // operating check balance
  if (operationAnswer.operation === "Check balance") {
    console.log(`Your acount balance is ${accountBalance}`);
  }
} else {
  console.log("You have entered wrong PIN code");
}
