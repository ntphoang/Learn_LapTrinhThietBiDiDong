import { Text, View } from "react-native";

export class Car {
  brand: string;
  model: string;
  year: number;

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  showInfo() {
    return (
      <View>
        <Text>Brand: {this.brand}</Text>
        <Text>Model: {this.model}</Text>
        <Text>Year: {this.year}</Text>
      </View>
    );
  }
}