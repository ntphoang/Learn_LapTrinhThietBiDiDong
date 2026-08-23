import { StyleSheet, View } from "react-native";
import {
  Student,
  Teacher,
  School,
} from "./exercises/Bai30/School";

export default function App() {
  const students = [
    new Student("Hoang", 20),
    new Student("An", 21),
    new Student("Minh", 19),
  ];

  const teachers = [
    new Teacher("Mr. Nam", "TypeScript"),
    new Teacher("Ms. Lan", "React Native"),
  ];

  const school = new School(students, teachers);

  return (
    <View style={styles.container}>
      {school.showInfo()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});