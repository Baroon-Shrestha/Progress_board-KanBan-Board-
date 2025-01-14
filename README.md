# KanBan Progress Board

it is a simple progress baord with drag and drop functionality of the card similar to kanban board. th euser is able to perform CRUD operation on the card such as add, remove update and read the data. the data are stored in the user's browser's local storage.

## Project Structure

1. **React + Vite**
   - Inside of the src folder the app.jsx and component folder are used.
   - Inside of the component folder:
   - `CreateTask` : used to add new tasks and update the tasks
   - `Lists` : displays all the tasks and categories based on the progress
   - `Sections` : For managing task sections (e.g., To Do, In Progress, Done).
   - `Tasks` : For individual tasks with drag-and-drop functionality.

## Features

- Drag and drop functionality between differnt To do, In progress and competed sections
- CRUD operation : Add, remove, update and edit the tasks
- Persistent Storage : use of browser's local storage to store the data
- Search tasks : search tasks based on the tasks name

## How to Run

### 1. Clone the Repository

clone the project repository to your local machine with command:

```bash
git clone https://github.com/Baroon-Shrestha/Progress_board-KanBan-Board-.git
```

### 2. Open the project

cd Progress_board-KanBan-Board

### 3. Install Dependencies

```bash
npm install
```

OR

```bash
npm i
```

### 4. Run the project

```bash
npm run dev
```
