import { Text, View } from "react-native";

export interface Flyable {
  fly(): string;
}

export interface Swimmable {
  swim(): string;
}

export class Bird implements Flyable {
  fly(): string {
    return "Bird is flying";
  }

  showInfo() {
    return (
      <View>
        <Text>{this.fly()}</Text>
      </View>
    );
  }
}

export class Fish implements Swimmable {
  swim(): string {
    return "Fish is swimming";
  }

  showInfo() {
    return (
      <View>
        <Text>{this.swim()}</Text>
      </View>
    );
  }
}