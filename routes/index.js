const paths = [
    'api',
    'web'
];

module.exports = app => {
  for (const path of paths) {
    require('./' + path + '/routes')(app);
  }
};
