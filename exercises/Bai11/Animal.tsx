import { Text, View } from "react-native";

export class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class Dog extends Animal {
  bark(): string {
    return "Woof!";
  }

  showInfo() {
    return (
      <View>
        <Text>Name: {this.name}</Text>
        <Text>Sound: {this.bark()}</Text>
      </View>
    );
  }
}

export class Cat extends Animal {
  meow(): string {
    return "Meow!";
  }

  showInfo() {
    return (
      <View>
        <Text>Name: {this.name}</Text>
        <Text>Sound: {this.meow()}</Text>
      </View>
    );
  }
}