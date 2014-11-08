#! /usr/bin/env node
var Poem = require('./');
var argv = require('minimist')(process.argv.slice(2));
var fs   = require('fs');
var path = require('path');

var opts = {};

if ( argv.V || argv['version'] ) {
    console.log('Poemify, version ' + JSON.parse(fs.readFileSync('./package.json')).version);
    process.exit();
}

if ( argv.p || argv['punctuation'] )    { opts.punctuation       = argv.p ? JSON.parse(argv.p) : JSON.parse(argv['punctuation']); }
if ( argv.s || argv['stanza-length'])   { opts.max_stanza_length = argv.s ? JSON.parse(argv.s) : JSON.parse(argv['stanza-length']); }
if ( argv.l || argv['line-length'])     { opts.max_line_length   = argv.l ? JSON.parse(argv.l) : JSON.parse(argv['line-length']); }
if ( argv.v || argv['variable-length']) { opts.variable_length   = argv.v ? JSON.parse(argv.v) : JSON.parse(argv['variable-length']); }

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