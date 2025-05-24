import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  columns: {
  },
  isDark: false
};

const taskSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {

    addcolumn: (state, action) => {
      state.columns[action.payload] = [];
    },

    addtask: (state, action) => {
      const { inp, des, col } = action.payload;
      const taskitem = { inp, des, id: Date.now() };
      state.columns[col].push(taskitem);
    },

    edittask: (state, action) => {
      const { prevcol, col, task } = action.payload;

      if (!state.columns || !state.columns[col]) {
        alert("Column does not exist:", col);
        return;
      }

      if (prevcol == col) {
        state.columns[col] = state.columns[col].map((item) => {
          if (item.id == task.id) return task;
          return item;
        })
      }
      else {
        state.columns[prevcol] = state.columns[prevcol].filter(item => item.id !== task.id);
        state.columns[col].push(task);
      }

    },

    handledrop: (state, action) => {
      const { source, destination } = action.payload;
      if (!destination) return;

      const sourceList = state.columns[source.droppableId];
      const destList = state.columns[destination.droppableId];

      if (!sourceList || !destList) return;

      const [movedItem] = sourceList.splice(source.index, 1);
      if (!movedItem) return;

      destList.splice(destination.index, 0, movedItem);
    }


  },
});

export const { addcolumn, addtask, edittask, handledrop } = taskSlice.actions;

export default taskSlice.reducer;
