var tape = require('tape')
  , Poem = require('./')
  , text = "I've been everywhere from soaring with the eagles to slithering with the snakes the madness is runnin' wild destroy i'm the world wrestling federation champion and you're not"
  , punct = /[\,\.\!\?\;\-\…]/g
  , p, gen  
    ;

tape('includes punctuation w/ option', function(t) {
    p = new Poem(text, { punctuation: true });
    t.ok(p.generate().match(punct), 'contains at least one punctuation item');

    pp = new Poem(text, { punctuation: false });
    t.notOk(pp.generate().match(punct), 'should _not_ contain any punctuation');

    t.end();
});

tape('doesn\'t lose any text w/ generation', function(t) {
    p = new Poem(text, {indent: ''} );
    t.equals(p.generate().split(/[\n\s]+/).length, text.split(' ').length);
    t.end();
});