import { Text, View } from "react-native";

export class Logger {
  private static instance: Logger;
  private message: string = "";

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  log(message: string): void {
    this.message = message;
  }

  showInfo() {
    return (
      <View>
        <Text>{this.message}</Text>
      </View>
    );
  }
}