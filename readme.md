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

```js
var Poem = require('poemify');
var p = new Poem(fs.readFileSync('masterpiece.txt').toString());
console.log(p.generate());
```

## (cli)
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