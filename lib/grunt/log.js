
module.exports = function(loggerFactory) {
  return loggerFactory.create('grunt-particles'); 
};

module.exports.__module = {
  args: ['loggerFactory']
};
