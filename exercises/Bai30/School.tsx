import { Text, View } from "react-native";

export class Student {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

export class Teacher {
  name: string;
  subject: string;

  constructor(name: string, subject: string) {
    this.name = name;
    this.subject = subject;
  }
}

export class School {
  students: Student[];
  teachers: Teacher[];

  constructor(
    students: Student[],
    teachers: Teacher[]
  ) {
    this.students = students;
    this.teachers = teachers;
  }

  showInfo() {
    return (
      <View>
        <Text>Students:</Text>

        {this.students.map((student, index) => (
          <Text key={index}>
            {student.name} - {student.age}
          </Text>
        ))}

        <Text>Teachers:</Text>

        {this.teachers.map((teacher, index) => (
          <Text key={index}>
            {teacher.name} - {teacher.subject}
          </Text>
        ))}
      </View>
    );
  }
}