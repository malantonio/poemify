module.exports = Poem;

function Poem(text, opts) {
    opts = opts || {};

    this.options = {
        'coinflip'          : opts.coinflip          || function() { return Math.random() < 0.125; },
        'max_line_length'   : opts.max_line_length   || 6,
        'max_stanza_length' : opts.max_stanza_length || 5,
        'indent'            : opts.indent            || '    ',
        'new_line'          : opts.new_line          || '\n',
        'new_stanza'        : opts.new_stanza        || '\n\n',
        'punctuation'       : !!opts.punctuation     || true
    };
  
    this.punctuation = {
        'comma'       : opts.comma       || ',',
        'period'      : opts.period      || '.',
        'exclamation' : opts.exclamation || '!',
        'question'    : opts.question    || '?',
        'semicolon'   : opts.semicolon   || ';',
        'hypen'       : opts.hypen       || '-',
        'ellipsis'    : opts.ellipsis    || '…'
    };
    
    this.corpus = text.replace(/\,\.\!\?\;\-\…/g,  '').split(opts.split || ' ')
    this.corpus_len = this.corpus.length
    this.out = ''
}

Poem.prototype.generate = function generate() {
    var stanzas = [];

    while ( this.corpus.length ) {
        stanzas.push(this._makeStanza());
    }

    return stanzas.join(this.options.new_stanza);
}

Poem.prototype._randomPunctuation = function randomPunctuation() {
    if ( !this.options.punctuation ) { return; }
    var props = [];
    for ( var p in this.punctuation ) {
        props.push(p);
    }

    return this.punctuation[props[Math.floor(Math.random() * props.length)]];
}

Poem.prototype._coinflip = function coinflip() { 
    return Math.random() < 0.125; 
}

Poem.prototype._lineLength = function linelength() { 
    return Math.ceil(Math.random() * this.options.max_line_length); 
}

Poem.prototype._stanzaLength = function stanzaLength() {
    return Math.ceil(Math.random() * this.options.max_stanza_length);
}

Poem.prototype._makeLine = function makeline() {
    var line = [], i = 0, line_length = this._lineLength();

    while ( i < line_length && this.corpus.length ) {
        line.push('' + this.corpus.shift() + (this.options.coinflip() ? this._randomPunctuation() : ''));
        i++;
    }

    return line.join(' ')
}

Poem.prototype._makeStanza = function makeStanza() {
    var stanza = [], i = 0, stanza_length = this._stanzaLength();

    while ( i < stanza_length && this.corpus.length ) {
        stanza.push( '' + (this.options.coinflip() ? this.options.indent : '') + this._makeLine() )
        i++;
    }

    return stanza.join(this.options.new_line);
}