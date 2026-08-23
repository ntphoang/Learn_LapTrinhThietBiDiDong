import { Text, View } from "react-native";

export class Book {
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}

export class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class Library {
  books: Book[] = [];
  users: User[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  showInfo() {
    return (
      <View>
        <Text>Books:</Text>

        {this.books.map((book, index) => (
          <Text key={index}>{book.title}</Text>
        ))}

        <Text>Users:</Text>

        {this.users.map((user, index) => (
          <Text key={index}>{user.name}</Text>
        ))}
      </View>
    );
  }
}