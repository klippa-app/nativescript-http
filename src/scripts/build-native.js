const { exec } = require('child_process');
const semver = require('semver');

exec('tns --version', (err, stdout, stderr) => {
    if (err) {
        // node couldn't execute the command
        console.log(`tns --version err: ${err}`);
        return;
    }

    console.log(`executing 'tns plugin build'`);
    exec('tns plugin build', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log(`${err}`);
            return;
        }
    });
});
