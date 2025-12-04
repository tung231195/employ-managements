import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { loadState, saveState } from '../utils/localStorage';

const persistedEmployees = loadState();

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: persistedEmployees, 
  },
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push({ id: uuidv4(), ...action.payload });
      saveState(state.employees);
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) state.employees[index] = action.payload;
      saveState(state.employees);
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
      saveState(state.employees);
    },
    sortByName: (state) => {
      state.employees.sort((a, b) => a.name.localeCompare(b.name));
      saveState(state.employees);
    },
    sortByAddress: (state) => {
      state.employees.sort((a, b) => a.address.localeCompare(b.address));
      saveState(state.employees);
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee, sortByName, sortByAddress } = employeeSlice.actions;
export default employeeSlice.reducer;
