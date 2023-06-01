const { exec } = require("child_process");

const io = require("socket.io")(2222, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    socket.on('command', (req, res) => {
        const { id, cmd } = req;
        if (!id) {
            if (res) {
                return res({
                    type: 'err',
                    msg: 'id is required'
                })
            }
            return;
        }
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                socket.emit(id, {
                    type: 'err',
                    msg: error.message
                })
            }
            else if (stderr) {
                socket.emit(id, {
                    type: 'err',
                    msg: stderr
                })
            } else {
                socket.emit(id, {
                    type: 'success',
                    msg: stdout
                })
            }

        });
    })
});

