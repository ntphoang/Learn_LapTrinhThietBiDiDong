import { Text, View } from "react-native";

export class MathUtil {
  static add(a: number, b: number): number {
    return a + b;
  }

  static subtract(a: number, b: number): number {
    return a - b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  static divide(a: number, b: number): number {
    return a / b;
  }

  static showInfo() {
    return (
      <View>
        <Text>Add: {MathUtil.add(10, 5)}</Text>
        <Text>Subtract: {MathUtil.subtract(10, 5)}</Text>
        <Text>Multiply: {MathUtil.multiply(10, 5)}</Text>
        <Text>Divide: {MathUtil.divide(10, 5)}</Text>
      </View>
    );
  }
}