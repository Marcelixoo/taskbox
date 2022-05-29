import { configureStore, createSlice } from "@reduxjs/toolkit";

import { TASK_INBOX } from "./components/Task";

/** Initial state of our store */
const initialTasks = [
  { id: '1', title: 'Testing task', state: TASK_INBOX },
  { id: '2', title: 'Testing task', state: TASK_INBOX },
  { id: '3', title: 'Testing task', state: TASK_INBOX },
  { id: '4', title: 'Testing task', state: TASK_INBOX },
];
const TaskBoxInitialState = {
  tasks: initialTasks,
  status: 'idle',
  error: null,
};

/** Store creation is handled here (see https://redux-toolkit.js.org/api/createSlice) */
export const TasksSlice = createSlice({
  name: 'taskbox',
  initialState: TaskBoxInitialState,
  reducers: {
    updateTaskState: (state, action) => {
      const { id, newTaskState } = action.payload;

      state.tasks = state.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            state: newTaskState,
          };
        }
        return task;
      });
    }
  }
});

/** Actions are exported to be used in our components */
export const { updateTaskState } = TasksSlice.actions;

/** Store configuration is handled here (see https://redux-toolkit.js.org/api/configureStore) */
const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer,
  }
});

export default store;
