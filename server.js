const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

// cors 설정
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 4000;

// 어떤 방에 어떤 유저가 들어있는지
let rooms = {};
// socket.id 기준으로 어떤 방에 들어있는지
let socketRoom = {};

// 방의 최대 인원수
const MAXIMUM_USERS_PER_ROOM = 2;

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    console.log(`${socket.id}님이 ${data.room}번방에 입장하였습니다`);
    socket.join(data.room);
    socketRoom[socket.id] = data.room;

    if (rooms[data.room]) {
      const currentRoomLength = rooms[data.room].length;
      if (currentRoomLength === MAXIMUM_USERS_PER_ROOM) {
        socket.to(socket.id).emit("room_full");
        return;
      }

      rooms[data.room].push({ id: socket.id });

      // 방에 이미 있는 사용자에게 신호를 보냄
      io.to(rooms[data.room][0].id).emit("all_user");
    } else {
      rooms[data.room] = [{ id: socket.id }];
    }
  });

  // offer를 전달받고 다른 유저들에게 전달
  socket.on("offer", (offer, roomName) => {
    console.log("서버 Offer");
    socket.to(roomName).emit("getOffer", offer);
  });

  // answer를 전달받고 방의 다른 유저들에게 전달
  socket.on("answer", (answer, roomName) => {
    console.log("서버 Answer");
    socket.to(roomName).emit("getAnswer", answer);
  });

  // candidate를 전달받고 방의 다른 유저들에게 전달
  socket.on("candidate", (candidate, roomName) => {
    socket.to(roomName).emit("getCandidate", candidate);
  });

  // message를 전달받고 방의 다른 유저들에게 전달
  socket.on("message", (message, roomName) => {
    console.log(` ${roomName}번방 메세지: ${message}`);
    socket.to(roomName).emit("getMessage", message);
  });

  // 방을 나가면 socketRoom과 users의 정보에서 해당 유저를 삭제
  socket.on("disconnect", () => {
    const roomID = socketRoom[socket.id];
    if (rooms[roomID]) {
      rooms[roomID] = rooms[roomID].filter((user) => user.id !== socket.id);
      if (rooms[roomID].length > 0) {
        delete rooms[roomID];
      }
    }
    delete socketRoom[socket.id];
    socket.broadcast.to(roomID).emit("user_exit", { id: socket.id });
    console.log(`사용자가 ${roomID}번 방에서 떠났습니다`);
  });
});

app.get("/", (req, res) => {
  res.send("채팅 서버 실행중");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`${PORT}에서 서버 실행중`);
});
