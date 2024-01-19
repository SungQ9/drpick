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
  console.log(socket.id, "접속하였습니다");
  socket.on("join_room", (data) => {
    // 방이 기존에 생성되어 있다면
    if (rooms[data.room]) {
      // 현재 입장하려는 방에 있는 인원수
      const currentRoomLength = rooms[data.room].length;
      if (currentRoomLength === MAXIMUM_USERS_PER_ROOM) {
        // 인원수가 꽉 찼다면 돌아감
        socket.to(socket.id).emit("room_full");
        return;
      }

      // 여분의 자리가 있다면 해당 방 배열에 추가
      rooms[data.room] = [...rooms[data.room], { id: socket.id }];
    } else {
      // 방이 존재하지 않다면 값을 생성하고 추가
      rooms[data.room] = [{ id: socket.id }];
    }
    socketRoom[socket.id] = data.room;

    // 입장
    socket.join(data.room);

    // 입장하기 전 해당 방의 다른 유저들이 있는지 확인하고
    // 다른 유저가 있었다면 offer-answer을 위해 알림
    const otherUsers = rooms[data.room].filter((user) => user.id !== socket.id);
    if (otherUsers.length) {
      io.sockets.to(socket.id).emit("all_users", otherUsers);
    }
  });

  // offer를 전달받고 다른 유저들에게 전달
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("getOffer", offer);
  });

  // answer를 전달받고 방의 다른 유저들에게 전달
  socket.on("answer", (answer, roomName) => {
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
    console.log(`유저가 ${roomID}번방을 떠났습니다`);
    if (rooms[roomID]) {
      rooms[roomID] = rooms[roomID].filter((user) => user.id !== socket.id);
      if (rooms[roomID].length === 0) {
        delete rooms[roomID];
        return;
      }
    }
    delete socketRoom[socket.id];
    socket.broadcast.to(rooms[roomID]).emit("user_exit", { id: socket.id });
  });
});

app.get("/", (req, res) => {
  res.send("채팅 서버 실행중");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`${PORT}에서 서버 실행중`);
});
