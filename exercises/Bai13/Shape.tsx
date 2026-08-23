import { Text, View } from "react-native";

export abstract class Shape {
  abstract area(): number;
}

export class Square extends Shape {
  side: number;

  constructor(side: number) {
    super();
    this.side = side;
  }

  area(): number {
    return this.side * this.side;
  }

  showInfo() {
    return (
      <View>
        <Text>Square area: {this.area()}</Text>
      </View>
    );
  }
}

export class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }

  showInfo() {
    return (
      <View>
        <Text>Circle area: {this.area().toFixed(2)}</Text>
      </View>
    );
  }
}