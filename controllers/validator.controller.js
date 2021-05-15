const HOME_ROUTE_MESSAGE = {
  message: 'My Rule-Validation API',
  status: 'success',
  data: {
    name: 'Gideon Idowu',
    github: '@Prodigy00',
    email: 'simplygiddy@gmail.com',
    mobile: '08064999937',
  },
};

function homeRoute(req, res, next) {
  res.send(HOME_ROUTE_MESSAGE);
}

module.exports = {
  homeRoute,
};
