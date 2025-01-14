import { useDrop } from "react-dnd";
import Task from "./Tasks";
import toast from "react-hot-toast";

const Section = ({ status, tasks, setTask }) => {
  // use of useDrop function to drop the dragged task in the another section
  //   add a varible drop to referece to the usedrop hook
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task", //the accept task varibale must of the same type as the dragging varibale
    drop: (item) => {
      // Update the task's status to match the dropped section
      addItemToSection(item.id, status);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), //monitor the changes in the dragging and droping section
    }),
  }));

  // Function to update the task's status in the global task list
  const addItemToSection = (id, newStatus) => {
    //use setTask to update the state globally
    setTask((prev) => {
      const updatedTasks = prev.map((task) => {
        // if the dragged item's task id matches with the parameters id change the status keeping the remaining field the same
        if (task.id === id) {
          return { ...task, status: newStatus };
        }
        return task; // the task id doesnot match return the task to the same section
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // if the task is updated or trasnfered to new section update it to the local storage

      toast.success("Status updated");
      return updatedTasks;
    });
  };

  //   change the background color according to the status
  const getSectionStyles = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100";
      case "Completed":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  const color = getSectionStyles(status); // call the function and set the style to the main code

  return (
    <div className="flex flex-1 gap-4">
      {/* refrence the drop varibale that is initialized in the useDrop hook */}
      <div
        ref={drop}
        className={`flex flex-col flex-1 border border-gray-300 p-4 rounded-lg ${
          isOver ? "bg-gray-200" : ""
        }`}
        style={{ minHeight: "300px" }}
      >
        {/* call the header function and pass the status color and the number tasks in the props */}
        <Header text={status} color={color} count={tasks.length} />

        {/* map the tasks that are sent as props from the list component */}
        {tasks.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTask={setTask} />
        ))}
      </div>
    </div>
  );
};

const Header = ({ text, color, count }) => {
  return (
    <>
      {/* //style the header accrodingly and use the text, color and count passed in the props */}
      <div
        className={`flex items-center gap-2 ${color} p-2 rounded-lg mb-4 w-[250px]`}
      >
        <span className="text-sm font-medium">{text}</span>
        <span className="text-xs text-gray-500">{count} tasks</span>
      </div>
    </>
  );
};

export default Section;
