import { Text, View } from "react-native";

export class Product {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  showInfo() {
    return (
      <View>
        <Text>{this.name} - ${this.price}</Text>
      </View>
    );
  }
}