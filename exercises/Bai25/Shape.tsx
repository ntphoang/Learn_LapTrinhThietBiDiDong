import { Text, View } from "react-native";

export class Shape {
  static describe(): string {
    return "This is a shape";
  }

  static showInfo() {
    return (
      <View>
        <Text>{Shape.describe()}</Text>
      </View>
    );
  }
}