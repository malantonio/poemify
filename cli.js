#! /usr/bin/env node
var Poem = require('./');
var argv = require('minimist')(process.argv.slice(2));
var fs   = require('fs');
var path = require('path');

var opts = {
    'no_punctuation': true
}

if ( argv.p ) {
    opts.no_punctuation = false;
}

if ( !process.stdin.isTTY ) {
    var str = '';
    process.stdin.on('readable', function() {
        var chunk = process.stdin.read();
        if ( chunk ) {
            str += chunk.toString();
        }
    });
    
    process.stdin.on('end', function() {
        if ( str !== '' ) {
            writePoem(str, opts);
        }
    });

} else if ( argv._.length ) { 
    var filepath = path.join(__dirname, argv._.toString());
    var text = fs.readFileSync(filepath).toString();
    writePoem(text, opts);
} else {
    usage();
}

function writePoem(input, opts) {
    var p = new Poem(input, opts);
    console.log(p.generate());
    process.exit();
}

function usage() {
    console.log('Usage: poemify <file>');
    console.log('or pipe into poemify');

    process.exit();
}