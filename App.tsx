import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  // =============== BÀI 1 ================
  // const promise = new Promise<string>((resolve)=>{
  //   setTimeout(()=>{
  //       resolve("Hello Async");
  //   }, 2000);
  // });

  // promise.then(result=>{
  //     console.log(result);
  // });

  // =============== BÀI 2 ================
  // function getNumberDelayed(){
  //   return new Promise((resolove)=>{
  //       setTimeout(()=>{
  //           resolove(10);
  //       }, 1000);
  //   });
  // }
  // getNumberDelayed().then(number=>
  //   console.log("Giá trị nhận được:",number)
  // );

  // =============== BÀI 3 ================
  function throwErrorDelayed(){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        reject("Something went wrong")
      }, 1000);
    });
  }

  // =============== BÀI 4 ================
  function generateRandomNumber(){
    return new Promise((resolve, reject)=>{
      const randomNumber = Math.random();
      if(randomNumber > 0.5){
        resolve(randomNumber);
      }else{
        reject("Number is too small!")
      }
    });
  }
  // generateRandomNumber()
  // .then(num=>console.log("Success: ", num))
  // .catch(err=>console.error("Error: ", err))

  // =============== BÀI 5 ================
  function simulateTask(time){
    return new Promise((resolve)=>{
      setTimeout(() => {
        resolve(`Task done in ${time}ms`);
      }, time);
    });
  }

  // simulateTask(3000).then(resolve=>console.log(resolve));

  // =============== BÀI 6 ================
  // Promise.all([
  //   simulateTask(1000),
  //   simulateTask(2000),
  //   simulateTask(3000)
  // ])
  // .then(result => console.log("All task completed: ", result))
  // .catch(err => console.error("One task failed: ",err))

  // =============== BÀI 7 ================
  // Promise.race([
  //   simulateTask(2000),
  //   simulateTask(1000)
  // ])
  // .then(winner => console.log("First to finish: ",winner));

  // =============== BÀI 8 ================  
  // Promise.resolve(2)
  // .then((num)=>num*num)
  // .then((num)=>num*2)
  // .then((num)=>num+5)
  // .then(finalResult => console.log("Result: ", finalResult))

  // =============== BÀI 9 ================
  // function getNumberDelayed(){
  //   return new Promise((resolve)=>{
  //     setTimeout(()=>{
  //       resolve([1,2,3,4,5,6]);
  //     },1000);
  //   })
  // }

  // getNumberDelayed()
  // .then(numbers=>numbers.filter(num=>num%2===0))
  // .then(evenNumbers=>console.log("Even numbers: ", evenNumbers));

  // =============== BÀI 10 ================
  // generateRandomNumber()
  // .then((num) => console.log("Got number:", num))
  // .catch((err) => console.log("Got error:", err))
  // .finally(() => console.log("Done: Promise settled (resolved or rejected)."));

  // =============== BÀI 11 ================
  function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  }

  // async function printGreeting() {
  //   await delay(2000); 
  //   console.log("Hello Async");
  // }

  // printGreeting();

  // =============== BÀI 12 ================
  // async function runSimulatedTask(){
  //   const result = await simulateTask(2000);
  //   console.log(result);
  // }

  // runSimulatedTask();

  // =============== BÀI 13 ================
  async function runWithHandling() {
    try {
      const data = await throwErrorDelayed(); 
      console.log(data);
    } catch (error) {
      console.error("Lỗi bắt được:", error);
    }
  }

  // runWithHandling();

  // =============== BÀI 14 ================
  async function multiplyByThree(num) {
    await delay(1000);
    return num * 3;
  }
  // console.log(multiplyByThree(100));

  // =============== BÀI 15 ================
  async function runSequentially() {
    // Tổng thời gian chờ: 1s + 2s = 3s
    const task1 = await simulateTask(1000); 
    console.log(task1);
    
    const task2 = await simulateTask(2000); 
    console.log(task2);
  }
  // runSequentially();

  // =============== BÀI 16 ================
  async function runInParallel() {
    // Tổng thời gian chờ chỉ bằng thời gian của task lâu nhất (2s)
    const results = await Promise.all([
      simulateTask(1000),
      simulateTask(2000)
    ]);
    console.log("Kết quả song song:", results);
  }
  // runInParallel();

  // =============== BÀI 17 ================
  async function processPromises(promiseArray) {
    for await (const result of promiseArray) {
      console.log(result);
    }
  }
  const myPromises = [
    simulateTask(1000), // Xong sau 1s
    simulateTask(2000), // Xong sau 2s
    simulateTask(3000)  // Xong sau 3s
  ];

  // Chạy test
  // processPromises(myPromises).then(() => {
  //   console.log("Bài 17: Đã duyệt xong toàn bộ mảng!");
  // });

  // =============== BÀI 18 ================
  async function fetchUser(id) {
    await delay(1000);
    return { id, name: `User_${id}` };
  }

  // Cách test dùng async IIFE (Hàm async vô danh tự gọi)
// (async () => {
//   console.log("Bài 18: Đang lấy dữ liệu user...");
//   const user = await fetchUser(99); 
//   console.log("Bài 18 - Kết quả:", user); // Kỳ vọng: { id: 99, name: "User_99" }
// })();

  // =============== BÀI 19 ================
  async function fetchUsers(ids) {
  // ids.map trả về mảng các Promise chưa resolve
  const userPromises = ids.map(id => fetchUser(id)); 
  const users = await Promise.all(userPromises);
  return users;
}

//   (async () => {
//   console.log("Bài 19: Bắt đầu lấy danh sách users...");
//   console.time("FetchUsersTime"); // Bắt đầu đếm thời gian
  
//   const userIds = [1, 2, 3, 4, 5];
//   const users = await fetchUsers(userIds);
  
//   console.log("Bài 19 - Kết quả:", users);
//   console.timeEnd("FetchUsersTime"); // Kỳ vọng: Tốn khoảng ~1s cho cả 5 users
// })();
  
  // =============== BÀI 20 ================
  // Sửa lại hàm fetchUser một chút (mô phỏng server bị chậm, mất 3s mới phản hồi)
async function fetchUserSlow(id) {
  await delay(3000); 
  return { id, name: `User_${id}` };
}

// Logic test (Cập nhật fetchUser thành fetchUserSlow trong Promise.race)
async function testTimeout(id) {
  try {
    const result = await Promise.race([
      fetchUserSlow(id),     // Mất 3s
      timeoutError(2000)     // Mất 2s
    ]);
    console.log("Lấy data thành công:", result);
  } catch (error) {
    console.error("Bài 20 - Lỗi bắt được:", error.message); // Kỳ vọng in ra: "API timeout!"
  }
}

// Chạy test
testTimeout(42);

  // =============== BÀI 21 ================
  async function fetchTodo(id) {
  // Lấy HTTP Response
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  // Parse body sang JSON
  return await response.json(); 
}

// Test
(async () => {
  const data = await fetchTodo(1);
  console.log("Bài 21:", data);
})();
  // =============== BÀI 22 ================

  async function fetchMultipleTodos(ids) {
  const requests = ids.map(id => fetchTodo(id)); // Tái sử dụng hàm Bài 21 (DRY)
  return await Promise.all(requests);
}

// Test
(async () => {
  const results = await fetchMultipleTodos([1, 2, 3]);
  console.log("Bài 22:", results);
})();
  // =============== BÀI 23 ================
  async function fetchAndFilterTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await response.json();
  
  // Lọc các công việc chưa hoàn thành
  return todos.filter(todo => !todo.completed); 
}

// Test
(async () => {
  const pendingTodos = await fetchAndFilterTodos();
  console.log("Bài 23 - Số lượng chưa hoàn thành:", pendingTodos.length);
})();
  // =============== BÀI 24 ================
  async function postData(payload) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return await response.json();
}

// Test
(async () => {
  const newPost = { title: 'Hello', body: 'World', userId: 1 };
  const result = await postData(newPost);
  console.log("Bài 24 - Tạo thành công:", result);
})();
  // =============== BÀI 25 ================
  // Tái tạo hàm delay để dùng chung (DRY)
const delayAsync = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function downloadFile(fileName) {
  console.log(`Bắt đầu tải ${fileName}...`);
  await delayAsync(3000);
  console.log(`Đã tải xong: ${fileName}`);
  return `${fileName}_content`;
}

// Test
(async () => {
  await downloadFile("document.pdf");
})();
  // =============== BÀI 26 ================
  async function waitFiveSeconds() {
  console.log("Chờ 5 giây...");
  await delayAsync(5000);
  console.log("Hết 5 giây!");
}

// Test
(async () => {
  await waitFiveSeconds();
})();
  // =============== BÀI 27 ================
  async function fetchWithRetry(url, retries) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.log(`Thử lần ${i + 1} thất bại...`);
      if (i === retries - 1) throw new Error("Hết lượt thử, API chết thật rồi!");
    }
  }
}

// Test (Với URL sai cố tình để ép lỗi)
(async () => {
  try {
    await fetchWithRetry('https://jsonplaceholder.typicode.com/invalid-url', 3);
  } catch (err) {
    console.error("Bài 27 - Bắt lỗi:", err.message);
  }
})();
  // =============== BÀI 28 ================
  async function batchProcess() {
  // Tạo mảng chứa 5 Promise gọi hàm downloadFile (Bài 25)
  const tasks = Array.from({ length: 5 }, (_, i) => downloadFile(`file_${i + 1}.txt`));
  
  console.time("Batch");
  const results = await Promise.all(tasks);
  console.timeEnd("Batch"); // Kỳ vọng: Chỉ tốn ~3s cho cả 5 file
  console.log("Bài 28 - Hoàn tất batch:", results);
}

// Test
// (Bỏ comment để chạy do có delay 3s)
batchProcess();
  // =============== BÀI 29 ================
  async function queueProcess(taskIds) {
  console.time("Queue");
  for (const id of taskIds) {
    const result = await downloadFile(`queue_file_${id}.txt`);
    console.log(`Xong tiến trình ID: ${id}`);
  }
  console.timeEnd("Queue"); // Kỳ vọng: Tốn 3s * 3 = ~9s
}

// Test
// (Bỏ comment để chạy do có delay 9s)
queueProcess([1, 2, 3]);
  // =============== BÀI 30 ================
  async function handleMultipleAPIs() {
  const promises = [
    fetchTodo(1), // API chuẩn (Sẽ resolve)
    fetch('https://invalid.domain').then(res => res.json()), // API lỗi (Sẽ reject)
    fetchTodo(2)  // API chuẩn (Sẽ resolve)
  ];

  const results = await Promise.allSettled(promises);
  
  // Phân loại kết quả để xử lý riêng biệt
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Task ${index} THÀNH CÔNG:`, result.value.id);
    } else {
      console.error(`Task ${index} THẤT BẠI:`, result.reason.message);
    }
  });
}

// Test
(async () => {
  await handleMultipleAPIs();
})();

  return (
    <View style={styles.container}>
      <Text>23711521_NguyenTranPhiHoang_Tuan02</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
