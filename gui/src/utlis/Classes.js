import zustand from 'zustand'
import { v4 } from 'uuid'

class Application {
    constructor(taskManager, config) {
        this.platform = taskManager.platform;
        this.taskManager = taskManager;
        this.config = config;
        this.id = v4();
    }

}

class TaskManager {
    constructor(platform) {
        this.platform = platform;
        this.apps = zustand((set) => ({
            apps: [],
            runApp: (app) => set(state => ({ apps: [...state.apps, new Application(this, app)] })),
        }));
    }
}


class Platform {
    constructor(socket) {
        this.socket = socket;
        this.TaskManager = new TaskManager(this);

    }

    command(cmd, cb) {
        const id = v4();
        //register event
        this.socket.on(id, (res) => {
            if (cb) {
                cb(res)
            }
            if (res.ended === id) {
                this.socket.off(id)
            }
        })

        this.socket.emit("command", { id, cmd });

    }
}


export {
    Platform
}