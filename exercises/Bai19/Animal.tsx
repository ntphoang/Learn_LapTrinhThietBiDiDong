import { Text, View } from "react-native";

export class Animal {
  sound(): string {
    return "Animal sound";
  }
}

export class Dog extends Animal {
  sound(): string {
    return "Woof!";
  }
}

export class Cat extends Animal {
  sound(): string {
    return "Meow!";
  }
}

export function showAnimal(animal: Animal) {
  return (
    <View>
      <Text>{animal.sound()}</Text>
    </View>
  );
}