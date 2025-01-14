import React, { useState } from "react";
import toast from "react-hot-toast";

export default function CreateTask({ tasks, setTask }) {
  const [task, setTaskState] = useState({
    id: "",
    name: "",
    status: "todo",
  }); //setting variables for new tasks with default values

  const handleSubmit = (e) => {
    e.preventDefault(); //

    //conditions to set a name or rules
    if (task.name.length < 3)
      return toast.error("Task name must be at least 3 characters");
    if (task.name.length > 150)
      return toast.error("Task name must not be more than 150 characters");

    //condition if the name of the tasks is alreadt used
    if (tasks.some((t) => t.name === task.name)) {
      return toast.error("Task with this name already exists");
    }

    //varible to creeate a new task
    const newTask = {
      id: Math.random().toString(36).substring(2, 10), // random value for a id as well as a unique variable
      name: task.name.trim(), // trimmed name as the starting and ending should not have any unnecessary space
      status: "todo", // default status to do.
    };

    // add new tasks in the setTask varibale
    setTask((prev) => {
      const newTasks = [...prev, newTask]; // along with the previous tasks add new task in the array and sav in the localstorage

      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });

    toast.success(`${task.name} added successfully`);

    //reset the taskstate for new entry
    setTaskState({
      id: "",
      name: "",
      status: "todo",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* call form on submit and add values accordingly */}
        <input
          type="text"
          className="border-2 border-gray-100 rounded-lg mr-4"
          value={task.name}
          //provide a value refrence for the empty form input field
          onChange={(e) => setTaskState({ ...task, name: e.target.value })}
          //call state onchange and leave the rest data unchanged and only change the name field
        />
        <button type="submit">Add new task</button>
      </form>
    </div>
  );
}
