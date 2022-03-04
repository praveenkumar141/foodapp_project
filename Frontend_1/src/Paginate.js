const paginate = (foods) => {
    const itemsPerPage = 12;
    const pages = Math.ceil(foods.length / itemsPerPage);
  
    const newFoods = Array.from({ length: pages }, (_, index) => {
      const start = index * itemsPerPage;
      return foods.slice(start, start + itemsPerPage);
    });
    return newFoods;
  };
  
  export default paginate;
  