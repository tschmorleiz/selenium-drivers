#!/usr/bin/env node

var exec = require('child_process').exec;

var config = require('./config.json');

var child;

process.nextTick(function() {
	var args = '';
	console.log('Starting selenium with drivers for:');
	var drivers = config.drivers || [];
	for(var i = 0; i < drivers.length; i++) {
		console.log('* ' + drivers[i].path);
		args += ' ' + drivers[i].arg + '=' + __dirname +'/lib/drivers/' + drivers[i].path;
	}
	var command = 'java -jar ' + __dirname + '/lib/selenium-server-standalone-' + config.seleniumversion + '.jar' + args;
	child = exec(command, function() {
		console.log(arguments);
	});
	child.stdout.on('data', console.log);
	child.stderr.on('data', console.error);
});

process.on('exit', die);
process.on('SIGINT', die);
process.on('SIGUSR2', die);

function die() {
	child.kill();
	process.exit();
}