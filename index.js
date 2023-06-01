const { exec } = require("child_process");

const io = require("socket.io")(2222, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    console.log("new user");
    socket.on('command', (req) => {
        console.log(req);
    })
});

