const addTodo = (task, taskDesc) => ({
    type: 'CREATE_TODO',
    payload: {
      task: task,
      taskDesc: taskDesc
    }
  });
  
  const setPage = (pageTerm, pageData) => ({
    type: 'SET_PAGE',
    payload: { pageTerm: pageTerm, pageData: pageData }
  });

  const setSearch = (searchTerm, searchData) => ({
    type: 'SET_SEARCH',
    payload: { searchTerm: searchTerm, searchData: searchData }
  });
  
  const loadingFalse = (pageTerm) => ({
    type: 'LOADING_FALSE',
    payload: { pageTerm: pageTerm }
  });
  
  const loadingTrue = (id) => ({
    type: 'LOADING_TRUE',
    payload: { id: id }
  });
  
  const addUser = (name, email) => ({
    type: 'CREATE_USER',
    payload: {
      name: name,
      email: email
    }
  });
  
  const deleteUser = (id) => ({
    type: 'DELETE_USER',
    payload: { id: id }
  });
  
  module.exports = {
    addTodo,
    setSearch,
    setPage,
    loadingFalse,
    loadingTrue,
    addUser,
    deleteUser
  };