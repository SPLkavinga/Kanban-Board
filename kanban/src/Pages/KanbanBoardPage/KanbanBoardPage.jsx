import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import person1 from "../../assets/PersonImage/person1.jpg";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import NavBar from "../../Components/NavBar";

const KanbanBoardPage = () => {
  const [tasks, setTasks] = useState({
    todo: [
      {
        id: "1",
        title: "Need to add Base URL to Frontend  and remove localhost:5000",
        category: "Frontend",
        assignees: ["Omalka", "John"],
        tags: ["frontend", "Important", "frontend", "Important"],
      },
      {
        id: "2",
        title: "Fix PDF Save Bug",
        category: "Backend",
        assignees: ["Omalka", "John"],
        tags: ["frontend", "Important"],
      },
    ],
    inProgress: [
      {
        id: "3",
        title: "Integrate API",
        category: "Frontend",
        assignees: ["Omalka"],
        tags: ["frontend", "Important"],
      },
    ],
    underReview: [],
    done: [
      {
        id: "4",
        title: "Fix CSS Issues",
        category: "Frontend",
        assignees: ["John"],
        tags: ["frontend", "Important"],
      },
    ],
  });

  const [isInputVisible, setInputVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isOptionsMenuOpen, setOptionsMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now().toString(),
      title: e.target.title.value,
      category: e.target.category.value,
      assignees: e.target.assignees.value.split(","),
      tags: e.target.tags.value.split(","),
    };

    // Add the new task to the "todo" column
    setTasks({
      ...tasks,
      todo: [...tasks.todo, newTask],
    });

    // Close the modal after adding the task
    setModalOpen(false);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside any column or the same position, return
    if (!destination) return;

    // Get the source and destination columns
    const sourceColumn = tasks[source.droppableId];
    const destinationColumn = tasks[destination.droppableId];

    // Remove the dragged task from the source column
    const [movedTask] = sourceColumn.splice(source.index, 1);

    // Add the task to the destination column
    destinationColumn.splice(destination.index, 0, movedTask);

    // Update the state
    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destinationColumn,
    });
  };

  const renderTask = (task, index) => (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 shadow rounded mb-3 relative"
        >
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-2 w-[200px]">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#ECDCFF] text-xs text-gray-600 py-1 px-2 rounded-[5px]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setSelectedTask(task);
                  setOptionsMenuOpen(!isOptionsMenuOpen);
                }}
                className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <BsThreeDots />
              </button>

              {isOptionsMenuOpen && selectedTask?.id === task.id && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-32">
                  <button
                    onClick={() => handleUpdateTask(task)}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="text-sm font-bold text-gray-800 mt-2 text-start">
            {task.title}
          </div>
          <div className="text-xs text-gray-500 mt-1 text-start">Assign to</div>
          <div className="flex mt-2 space-x-2 items-center">
            {task.assignees.map((assignee) => (
              <div
                key={assignee}
                className="flex items-center bg-gray-200 text-xs text-gray-600 py-1 px-2 rounded-full"
              >
                <img
                  src={person1}
                  alt={assignee}
                  className="w-5 h-5 rounded-full object-cover mr-2"
                />
                <span>{assignee}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Draggable>
  );

  const renderColumn = (title, columnKey) => (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold bg-[#EAEAFF] py-2 px-4 rounded-[5px] mr-2">
            {title}
          </h2>
          {/* Dynamic count for the tasks in the column */}
          <h2 className="text-[13px] font-semibold bg-gray-100 py-2 px-4 rounded-full mr-2">
            {tasks[columnKey].length}
          </h2>
        </div>
        <button
          className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
          onClick={handleButtonClick}
        >
          <FaPlus />
        </button>
      </div>

      <div className=" bg-gray-100 p-4 rounded-lg shadow mt-4 w-[300px]">
        <Droppable droppableId={columnKey}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="min-h-[150px]"
            >
              {tasks[columnKey].map((task, index) => renderTask(task, index))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );

  return (
    <>
      <NavBar />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="  mt-16">
          {/* Header Section */}
          <header className="mb-8">
            <div className="flex flex-row">
              <img
                src={person1}
                alt="Person"
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
              <h1 className="text-[14px] font-normal">Team 1</h1>
            </div>

            <h1 className="text-[40px] font-bold text-start">
              Product Development
            </h1>
            <div className="flex items-center justify-between  mb-4">
              <div>
                <h1 className="text-[13px] font-medium">Members on Board</h1>
                <div className="flex -space-x-3">
                  {[person1, person1, person1, person1, person1].map(
                    (image, index) => (
                      <div
                        key={index}
                        className="w-8 h-8  text-white border-2 border-white rounded-full flex items-center justify-center"
                      >
                        <img
                          src={image}
                          alt={`User ${index + 1}`}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="space-x-4">
                <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                  Filter
                </button>
                <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                  + Add Boards
                </button>
              </div>
            </div>
          </header>

          {/* Kanban Columns */}
          <div className="flex gap-4">
            {renderColumn("To Do", "todo")}
            {renderColumn("Work In Progress", "inProgress")}
            {renderColumn("Under Review", "underReview")}
            {renderColumn("Completed", "done")}
          </div>
        </div>
      </DragDropContext>
      {/* Modal for adding task */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4 text-start">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="mt-1 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-4 text-start">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  className="mt-1 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-4 text-start">
                <label className="block text-sm font-medium text-gray-700">
                  Assignees (comma separated)
                </label>
                <input
                  type="text"
                  name="assignees"
                  className="mt-1 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mb-4 text-start">
                <label className="block text-sm font-medium text-gray-700">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  className="mt-1 w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-4 px-4 py-2 border rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default KanbanBoardPage;
