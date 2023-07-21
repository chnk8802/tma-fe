// endpoints.js
const ENDPOINTS = {
    // User
    signup: '/users/signup',
    login: '/users/login',
    logout: '/users/logout',
    logoutAll: '/users/logout-all',
    user: '/users/me',
    updateUser: '/users/me/update',
    deleteUser:'/users/me/delete',
    uploadAvatar: '/users/me/avatar',
    deleteAvatar: '/users/me/avatar/delete',
    getAvatar:'/users/:id/avatar',
    // Tasks
    postTask: '/tasks',
    getTasks: '/tasks',
    getTaskByID: '/tasks:id',
    updateTask: '/tasks/:id',
    deleteTask: '/tasks/:id'
  };
  
  export default ENDPOINTS;