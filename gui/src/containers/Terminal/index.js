import { Terminal } from 'xterm'
const { useRef, useEffect, useState } = require("react");
export default ({ platform }) => {
    const refer = useRef(null);
    useEffect(() => {
        const term = new Terminal();
        term.open(refer.current);
        term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
        let cmd = '';
        term.onData((data) => {
            const code = data.charCodeAt(0);
            if (code === 13) {
                term.write('\r\n')
                //get last line data


                platform.command(cmd, (res) => {
                    if (res.type === 'err') {
                        term.write('\x1B[1;3;31m' + res.msg + '\x1B[0m\r\n')
                    } else {
                        term.write('\x1B[1;3;32m' + res.msg + '\x1B[0m\r\n')
                    }
                    term.write('\x1B[1;3;31mxterm.js\x1B[0m $ ')
                });
                cmd = '';
            } else if (code === 127) {
                term.write('\b \b')
                cmd = cmd.slice(0, -1);
            } else {
                term.write(data);
                cmd += data;

            }

        });
    }, [])
    return <div ref={refer}></div>
}