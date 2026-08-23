import { Text, View } from "react-native";

export class Book {
  title: string;
  author: string;
  year: number;

  constructor(title: string, author: string, year: number) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  showInfo() {
    return (
      <View>
        <Text>Title: {this.title}</Text>
        <Text>Author: {this.author}</Text>
        <Text>Year: {this.year}</Text>
      </View>
    );
  }
}