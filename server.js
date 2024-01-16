const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const cors = require('cors');
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3001;
app.use(cors());

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // 사용자가 방에 참여
  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);

    // 해당 방의 다른 사용자들에게 알림
    socket.to(roomId).broadcast.emit('userConnected', { userId: socket.id });
  });

  socket.on('sendSignal', (data) => {
    // 시그널 데이터를 해당 방의 다른 사용자에게 전달
    socket.to(data.roomId).broadcast.emit('receiveSignal', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);

    // 사용자 연결 해제 시 해당 방의 다른 사용자들에게 알림
    socket.broadcast.emit('userDisconnected', { userId: socket.id });
  });

  // 에러 핸들링
  socket.on('error', (err) => {
    console.error('Socket Error:', err);
  });
});

server.listen(PORT, () => {
  console.log(`${PORT} 포트에서 서버 실행`);
});
