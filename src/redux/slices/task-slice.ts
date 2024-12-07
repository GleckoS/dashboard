import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  filter: "all" | "completed" | "incomplete";
}

const initialState: TaskState = {
  tasks: [],
  filter: "all",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "completed" | "incomplete">
    ) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTask, setFilter, setTasks } = taskSlice.actions;

export default taskSlice.reducer;
