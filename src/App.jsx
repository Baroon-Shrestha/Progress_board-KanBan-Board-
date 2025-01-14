import React, { useEffect, useState } from "react";
import CreateTask from "./Components/CreateTask";
import Lists from "./Components/Lists";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  const [tasks, setTasks] = useState([]); //set the variables for task for gloabl use as well

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks"); // get tasks from localStorage
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks); // parse the task before getting them
        console.log(`Tasks stored in localStorage:`, parsedTasks);
        setTasks(parsedTasks); // set the tasks in the variable that is fetched from the localStorage
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error); //show errors in the console if any
      }
    }
  }, []);

  return (
    //use of react-dnd provider to creak drag and drog feature in the program
    //wrap whole program with DndProvider using react-dnd
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      {/* toaster for better response */}
      <h1 className="text-center mt-10 text-3xl font-bold">
        Progress Tracking Board
      </h1>
      <div className=" h-screen flex flex-col items-center pt-8 gap-4">
        <CreateTask tasks={tasks} setTask={setTasks} />
        {/* calling createTask component and passing tasks and setTasks variable as a prop */}
        <Lists tasks={tasks} setTask={setTasks} />
        {/* calling Lists component and passing tasks and setTasks variable as a prop */}
      </div>
    </DndProvider>
  );
}
