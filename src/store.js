import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { TASK_ARCHIVED, TASK_INBOX } from "./components/Task";

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

export const endpoint = 'https://jsonplaceholder.typicode.com/todos?userId=1';

/*
 * Creates an asyncThunk to fetch tasks from a remote endpoint.
 * You can read more about Redux Toolkit's thunks in the docs:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 */
export const loadTasks = createAsyncThunk('todos/load',async () => {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.map((task) => ({
    id: `${task.id}`,
    title: task.title,
    state: task.completed ? TASK_ARCHIVED : TASK_INBOX,
  }));
});

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
  },

  /*
   * Extends the reducer for the async actions
   * You can read more about it at https://redux-toolkit.js.org/api/createAsyncThunk
   */
  extraReducers(builder) {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.tasks = [];
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.tasks = action.payload;
      })
      .addCase(loadTasks.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Oh snap... something went wrong';
        state.tasks = [];
      })
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
