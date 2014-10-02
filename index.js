#!/usr/bin/env node

var exec = require('child_process').exec;

var config = require('./config.json');

exports.start = function (callback) {
	var args = '';
	console.log('Starting selenium with drivers for:');
	var drivers = config.drivers || [];
	for(var i = 0; i < drivers.length; i++) {
		console.log('* ' + drivers[i].path);
		args += ' ' + drivers[i].arg + '=' + __dirname +'/lib/drivers/' + drivers[i].path;
	}
	var command = 'java -jar ' + __dirname + '/lib/selenium-server-standalone-' + config.seleniumversion + '.jar' + args;
	var child = exec(command, function() {
		console.log(arguments);
	});
	child.stdout.on('data', function (line) {
		if (line.indexOf("Started org.openqa.jetty.jetty.Server") != -1) {
			callback && callback(null, child);
		}
	});
	child.stderr.on('data', function (line) {
		callback && callback(new Error(line));
	});
};
