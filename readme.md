# poemify

```
generate a
poem at random

with
a corpus

of; provided text. newlines
and
indentations? and
punctuation

   are- added
```

## usage
```
npm install poemify
```
add `-g` flag if you want to use globally

```js
var Poem = require('poemify');
var p = new Poem(fs.readFileSync('masterpiece.txt').toString());
console.log(p.generate());
```

## (cli)
use `-p` or `--punctuation` flag to include random punctuation
use `-s` or `--stanza-length` to set stanza length
use `-l` or `--line-length` to set line length
use `-v` or `--variable-length` to switch variable stanza + line length
use `-V` or `--version` to get the version number

```
poemify masterpiece.txt
>> masterpiece poem
>> echo'd out
>>    in the command
>> line
```

or pipe text in
```
pbpaste | poemify
```

## license
MIT
