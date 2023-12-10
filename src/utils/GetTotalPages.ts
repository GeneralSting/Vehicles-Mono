const getTotalPages = (totalItems: number, pageSize: number) => {
  return Math.ceil(totalItems / pageSize);
};

export default getTotalPages;
