import { Text, View } from "react-native";

export class Rectangle {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }

  showInfo() {
    return (
      <View>
        <Text>Width: {this.width}</Text>
        <Text>Height: {this.height}</Text>
        <Text>Area: {this.area()}</Text>
        <Text>Perimeter: {this.perimeter()}</Text>
      </View>
    );
  }
}