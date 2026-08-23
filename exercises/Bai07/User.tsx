import { Text, View } from "react-native";

export class User {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  showInfo() {
    return (
      <View>
        <Text>Name: {this.name}</Text>
      </View>
    );
  }
}