import { Text, View } from "react-native";

export class Animal {
  protected makeSound(): string {
    return "Animal sound";
  }

  showInfo() {
    return <Text>{this.makeSound()}</Text>;
  }
}

export class Dog extends Animal {
  protected override makeSound(): string {
    return "Woof!";
  }

  showInfo() {
    return (
      <View>
        <Text>Dog: {this.makeSound()}</Text>
      </View>
    );
  }
}

export class Cat extends Animal {
  protected override makeSound(): string {
    return "Meow!";
  }

  showInfo() {
    return (
      <View>
        <Text>Cat: {this.makeSound()}</Text>
      </View>
    );
  }
}