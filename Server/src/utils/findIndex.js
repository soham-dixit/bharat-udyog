export const findIndexById = (array, id) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].orderId == id) {
      return i; // Return the index if found
    }
  }
  return -1; // Return -1 if not found
};
