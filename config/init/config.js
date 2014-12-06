/*

	Read configuration file and set it to env
	
*/

var fs = require('fs')
	, config = fs.readFileSync('/Users/nsharm002c/freedoor/config/config.json', 'utf8')
;

module.exports = function(app, env) {
	// set the parsed config json object to env for global access
	env.config = JSON.parse(config);
}