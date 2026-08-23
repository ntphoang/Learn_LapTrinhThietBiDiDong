import { Text, View } from "react-native";

export interface Movable {
  move(): string;
}

export class Car implements Movable {
  move(): string {
    return "Car is moving";
  }

  showInfo() {
    return (
      <View>
        <Text>{this.move()}</Text>
      </View>
    );
  }
}

export class Robot implements Movable {
  move(): string {
    return "Robot is moving";
  }

  showInfo() {
    return (
      <View>
        <Text>{this.move()}</Text>
      </View>
    );
  }
}