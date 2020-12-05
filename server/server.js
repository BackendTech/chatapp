const io = require('socket.io')();
const ROOM_ID = 'room 237';
const soketMap = {};
let count = 1;
io.on('connection', function (soket) {
  console.log('SOCKET ID ->>', soket.id);
  // console.log('SOCKET ID ->> ROOM -> ', soket.rooms)
  soket.join(ROOM_ID);
  soketMap[count++] = soket.id;
  //    soket.on('gajendra', function(message){fsda
  //        console.log('gajendra --> ', message)
  //        soket.emit('gajendra', message)
  //        soket.emit('atul', message)
  //    })
  //    soket.on('atul', function(message){
  //        soket.emit('atul', message)
  //        soket.emit('gajendra', message)
  //        console.log('atul --> ', message)
  //    })
  soket.on('message', function (message) {
    // io.to(ROOM_ID).emit('message', 'a new user has joined the room');
    // for (var key in soketMap) {
    //     io.to(soketMap[key]).emit('message', 'a new user has joined the room');
    // }
    soket.broadcast.emit('message', message);
  });
});

io.listen(3001);
