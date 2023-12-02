const { spawn } = require('child_process')
const path = require('path')
const os = require('os')

const frontendLocation = path.join(__dirname, "../", "frontend")
let mvnwCmd = frontendLocation

if (os.platform() === 'win32') {
    //Windows use "mvnw.cmd"
    mvnwCmd += "/mvnw.cmd"
} else {
    //linux or macos use "mvnw"
    mvnwCmd += "/mvnw"
}

const child = spawn(mvnwCmd, ["spring-boot:run"], {
    cwd: frontendLocation
})

child.stdout.on('data', (buffer) => {
    console.log(buffer.toString('utf8'));
});
child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});
child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

// 监听 SIGINT 事件
process.on('SIGINT', () => {
    child.kill();
});