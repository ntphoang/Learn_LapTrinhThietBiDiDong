import { Text, View } from "react-native";

export interface Vehicle {
  start(): string;
}

export class Car implements Vehicle {
  start(): string {
    return "Car started";
  }

  showInfo() {
    return (
      <View>
        <Text>{this.start()}</Text>
      </View>
    );
  }
}

export class Bike implements Vehicle {
  start(): string {
    return "Bike started";
  }

  showInfo() {
    return (
      <View>
        <Text>{this.start()}</Text>
      </View>
    );
  }
}