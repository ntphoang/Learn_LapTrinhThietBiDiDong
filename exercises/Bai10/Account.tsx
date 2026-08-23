import { Text, View } from "react-native";

export class Account {
  public name: string;
  private balance: number;
  readonly accountNumber: string;

  constructor(
    name: string,
    balance: number,
    accountNumber: string
  ) {
    this.name = name;
    this.balance = balance;
    this.accountNumber = accountNumber;
  }

  getBalance(): number {
    return this.balance;
  }

  showInfo() {
    return (
      <View>
        <Text>Name: {this.name}</Text>
        <Text>Balance: {this.balance}</Text>
        <Text>Account Number: {this.accountNumber}</Text>
      </View>
    );
  }
}