import { Text, View } from "react-native";

export class Box<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  showInfo() {
    return (
      <View>
        <Text>{String(this.value)}</Text>
      </View>
    );
  }
}