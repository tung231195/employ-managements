import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { loadState, saveState } from '../utils/localStorage';

const persistedEmployees = loadState() || [];

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: persistedEmployees,
    allEmployees: persistedEmployees,
    currentPage: 1,
    pageSize: 2,
  },
  reducers: {
    addEmployee: (state, action) => {
      const newEmp = { id: uuidv4(), ...action.payload };

      state.employees.push(newEmp);
      state.allEmployees.push(newEmp);

      saveState(state.allEmployees);
    },

    updateEmployee: (state, action) => {
      const i1 = state.employees.findIndex(e => e.id === action.payload.id);
      const i2 = state.allEmployees.findIndex(e => e.id === action.payload.id);

      if (i1 !== -1) state.employees[i1] = action.payload;
      if (i2 !== -1) state.allEmployees[i2] = action.payload;

      saveState(state.allEmployees);
    },

    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(e => e.id !== action.payload);
      state.allEmployees = state.allEmployees.filter(e => e.id !== action.payload);

      saveState(state.allEmployees);
    },

    sortByName: (state) => {
      state.employees.sort((a, b) => a.name.localeCompare(b.name));
    },

    sortByAddress: (state) => {
      state.employees.sort((a, b) => a.address.localeCompare(b.address));
    },

    searchEmploys: (state, action) => {
      const keyword = action.payload.search.trim().toLowerCase();
      state.currentPage = 1;

      if (!keyword) {
        state.employees = state.allEmployees;
        return;
      }

      state.employees = state.allEmployees.filter((e) =>
        e.name.toLowerCase().includes(keyword)
      );
    },

    setPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  sortByName,
  sortByAddress,
  searchEmploys,
  setPage,
  setPageSize
} = employeeSlice.actions;

export default employeeSlice.reducer;
