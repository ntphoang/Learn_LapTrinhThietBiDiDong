import { Text, View } from "react-native";

export interface Animal {
  name: string;
  sound(): string;
}

export class Dog implements Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  sound(): string {
    return "Woof!";
  }

  showInfo() {
    return (
      <View>
        <Text>Name: {this.name}</Text>
        <Text>Sound: {this.sound()}</Text>
      </View>
    );
  }
}