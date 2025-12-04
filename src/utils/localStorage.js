export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('employees');
    if (!serializedState) return []; 
    const parsed = JSON.parse(serializedState);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Load state error:", e);
    return [];
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('employees', serializedState);
  } catch (e) {
    console.error("Save state error:", e);
  }
};
