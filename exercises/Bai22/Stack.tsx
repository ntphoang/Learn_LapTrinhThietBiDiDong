import { Text, View } from "react-native";

export class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  showInfo() {
    return (
      <View>
        <Text>Stack: {this.items.join(", ")}</Text>
        <Text>Peek: {String(this.peek())}</Text>
        <Text>Is Empty: {String(this.isEmpty())}</Text>
      </View>
    );
  }
}