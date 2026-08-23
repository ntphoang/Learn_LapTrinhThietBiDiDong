import { Text, View } from "react-native";

export class Employee {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class Manager extends Employee {
  manage(): string {
    return "Managing team";
  }

  showInfo() {
    return (
      <View>
        <Text>Name: {this.name}</Text>
        <Text>Role: Manager</Text>
        <Text>{this.manage()}</Text>
      </View>
    );
  }
}

export class Developer extends Employee {
  code(): string {
    return "Writing code";
  }

  showInfo() {
    return (
      <View>
        <Text>Name: {this.name}</Text>
        <Text>Role: Developer</Text>
        <Text>{this.code()}</Text>
      </View>
    );
  }
}