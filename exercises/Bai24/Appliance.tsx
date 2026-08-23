import { Text, View } from "react-native";

export abstract class Appliance {
  abstract turnOn(): string;
}

export class Fan extends Appliance {
  turnOn(): string {
    return "Fan is ON";
  }

  showInfo() {
    return (
      <View>
        <Text>{this.turnOn()}</Text>
      </View>
    );
  }
}

export class AirConditioner extends Appliance {
  turnOn(): string {
    return "Air Conditioner is ON";
  }

  showInfo() {
    return (
      <View>
        <Text>{this.turnOn()}</Text>
      </View>
    );
  }
}