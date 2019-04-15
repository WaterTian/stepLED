const SerialPort = require('serialport');
const port = new SerialPort('COM5', {
	baudRate: 9600,
	autoOpen: false
})

const io = require('socket.io')();
io.listen(3040);


io.sockets.on('connection', function(socket) {
	console.log("connection");
});



port.open(function(error) {
	if (error) {
		return console.log('Error opening port: ', err.message)
	}
	console.log('open');

});



// Switches the port into "flowing mode"
port.on('data', function(data) {
	// console.log('Data:', data.toString('ascii'))

	var num = Number(data.toString('ascii'));

	// console.log(num);

	io.emit('aArr', num); // emit an event to all connected sockets

})