import { Text, View } from "react-native";
import { Person } from "../Bai01/Person";

export class Teacher extends Person {
  subject: string;

  constructor(
    name: string,
    age: number,
    subject: string
  ) {
    super(name, age);
    this.subject = subject;
  }

  introduce() {
    return (
      <View>
        <Text>Name: {this.name}</Text>
        <Text>Age: {this.age}</Text>
        <Text>Subject: {this.subject}</Text>
      </View>
    );
  }
}