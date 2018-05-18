var PythonShell = require('python-shell');

var options = { pythonPath: 'python3' };

PythonShell.run('python/qrcodegen-demo.py', options, function (err, results) {
    if (err) throw err;
    console.log('finished');
});