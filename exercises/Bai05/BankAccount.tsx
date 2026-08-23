import { Text, View } from "react-native";

export class BankAccount {
  balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount;
    }
  }

  showInfo() {
    return (
      <View>
        <Text>Balance: {this.balance}</Text>
      </View>
    );
  }
}