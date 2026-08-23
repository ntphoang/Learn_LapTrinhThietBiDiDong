import { Text, View } from "react-native";

export class Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }

  showInfo() {
    return (
      <View>
        {this.items.map((item, index) => (
          <Text key={index}>{String(item)}</Text>
        ))}
      </View>
    );
  }
}