import React, { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import { useDrag } from "react-dnd";
import { RxCross2 } from "react-icons/rx";
import { FcCheckmark } from "react-icons/fc";

const Task = ({ task, setTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);

  //   use of react-dnd for dragging the task card
  //   set a varibale for and varibale for refrecing to the function and call the useDrag hook

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task", // select the type you want to drag
    item: { id: task.id, name: task.name, status: task.status }, // pass the details of the task
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // monitor the changes while the card is being draggd or not
    }),
  }));

  const handleRemove = (id) => {
    // Use the global `setTask` to update all tasks
    setTask((prevTasks) => {
      const updatedTasks = prevTasks.filter((t) => t.id !== id); // Filter the global task list
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Sync with localStorage
      toast.success("Task removed");
      return updatedTasks; // Return the new state
    });
  };

  const handleSave = (id, name) => {
    //condition for the new task anme
    if (newName.trim().length < 3) {
      toast.error("Task name must be at least 3 characters long");
      return;
    }
    if (newName.trim().length > 150) {
      toast.error("Task name must be at least 3 characters long");
      return;
    }

    // use of globally set task to update the selected task
    setTask(
      (prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? { ...t, name: newName } : t))
      // if the id and the task id matches leaving the rest update the task if the id doesnot match keep the previous task
    );

    // update the localstorage if the task is change change the name leaving the rest as same else keep the same name
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        JSON.parse(localStorage.getItem("tasks")).map((t) =>
          t.id === task.id ? { ...t, name: newName } : t
        )
      )
    );
    toast.success("Task updated");
    setIsEditing(false);
  };

  //if the cancel button is click the previously avaibale name is kept as the task.name
  const handleCancel = (id, name) => {
    console.log("edit cancelled");
    setNewName(task.name);
    setIsEditing(false);
  };

  //   const handleSave = () => {
  //     console.log("saved");
  //   };
  return (
    <div
      ref={drag} // add refrence to the drag variable in the above function which enables the cursor to drag the card
      className="relative mb-2 p-2 border bg-white rounded-lg shadow-md cursor-grab min-w-[250px] max-w-full text-lg"
    >
      {/* if editing is true use the input field to edit the name and if not use a papragraph tag to show the name */}
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      ) : (
        <p className="p-2 rounded-md break-words">{task.name}</p>
      )}
      {/* if editing is set to false show the edit and delete and if editing is true use the correct and or cancel buttons  */}
      {isEditing ? (
        <div className="absolute bottom-1 right-1 flex gap-2">
          <button
            className="text-sm bg-green-500 text-white rounded-full p-1"
            onClick={handleSave}
          >
            <FcCheckmark />
          </button>
          <button
            className="text-sm bg-red-500 text-white p-1 rounded-full"
            onClick={handleCancel}
          >
            <RxCross2 />
          </button>
        </div>
      ) : (
        // Show Edit and Delete buttons when not editing
        <div className="absolute bottom-1 right-1 flex gap-2">
          <button
            className="text-xl text-gray-500"
            onClick={() => setIsEditing(true)}
          >
            <MdEdit />
          </button>
          <button
            className="text-xl text-red-500"
            onClick={() => handleRemove(task.id)}
          >
            <MdDeleteForever />
          </button>
        </div>
      )}
    </div>
  );
};

export default Task;
