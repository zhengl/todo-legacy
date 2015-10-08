var jade = require('jade');

module.exports = {
  process: function (src, filename) {
	if (filename.match(/\.jade$/)) {
		return 'var jade = require("jade/lib/runtime"); module.exports = ' + jade.compileClient(src);
	} else if (filename.match(/\.svg$/) || filename.match(/\.css$/)) {
    return;
  }
	
	return src;
  }
};
