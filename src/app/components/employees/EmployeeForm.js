import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addEmployee, updateEmployee } from '../../store/employeeSlice';

export default function EmployeeForm({ employee, onClose }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (employee) reset(employee);
  }, [employee, reset]);

  const onSubmit = (data) => {
    if (employee) {
      dispatch(updateEmployee({ ...data, id: employee.id }));
    } else {
      dispatch(addEmployee({ ...data, id: Date.now().toString() }));
    }
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px' }}>
      <input {...register('name')} placeholder="Name" required />
      <input {...register('dateOfBirth')} type="date" placeholder="Date of Birth" required />
      <select {...register('gender')} required>
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input {...register('email')} type="email" placeholder="Email" required />
      <input {...register('address')} placeholder="Address" required />
      <button type="submit">{employee ? 'Update' : 'Add'}</button>
    </form>
  );
}