import { Text, View } from "react-native";

export interface Payment {
  pay(amount: number): string;
}

export class CashPayment implements Payment {
  pay(amount: number): string {
    return `Paid $${amount} by cash`;
  }

  showInfo(amount: number) {
    return (
      <View>
        <Text>{this.pay(amount)}</Text>
      </View>
    );
  }
}

export class CardPayment implements Payment {
  pay(amount: number): string {
    return `Paid $${amount} by card`;
  }

  showInfo(amount: number) {
    return (
      <View>
        <Text>{this.pay(amount)}</Text>
      </View>
    );
  }
}