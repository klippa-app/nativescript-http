const { exec } = require('child_process');
const semver = require('semver');

exec('ns --version', (err, stdout, stderr) => {
    if (err) {
        // node couldn't execute the command
        console.log(`ns --version err: ${err}`);
        return;
    }

    exec('ns plugin build', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log(`${err}`);
            return;
        }
    });
});
