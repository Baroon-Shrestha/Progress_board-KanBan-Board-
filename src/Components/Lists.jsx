import React, { useEffect, useState } from "react";
import Section from "./Section";

export default function Lists({ tasks, setTask }) {
  // set varibale to keep the state
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //use the useEffect hook and use tasks and search Term as dependencies which triggers the cahnge for in the list
  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase(); //make all the terms to lowercase for easiness

    //use the lowerCaseTerm for searching as wel as change the task name to lowerccse
    const fTodo = tasks.filter(
      (t) =>
        t.status === "todo" && t.name.toLowerCase().includes(lowerSearchTerm)
    );
    const fInProgress = tasks.filter(
      (t) =>
        t.status === "In Progress" &&
        t.name.toLowerCase().includes(lowerSearchTerm)
    );
    const fCompleted = tasks.filter(
      (t) =>
        t.status === "Completed" &&
        t.name.toLowerCase().includes(lowerSearchTerm)
    );

    // set the todo,progess and completed state
    setTodo(fTodo);
    setInProgress(fInProgress);
    setCompleted(fCompleted);
  }, [tasks, searchTerm]);

  const statuses = [
    { name: "todo", tasks: todo },
    { name: "In Progress", tasks: inProgress },
    { name: "Completed", tasks: completed },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* input fieldd for seaarch term */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-cyan-500 w-64"
      />

      {/* Sections */}
      <div className="flex items-start gap-6">
        {statuses.map((status, index) => (
          // different statuses are mapped according to the status such as todo, progress and completed as passed as props to the section
          <Section
            key={index}
            status={status.name}
            tasks={status.tasks}
            setTask={setTask}
          />
        ))}
      </div>
    </div>
  );
}
