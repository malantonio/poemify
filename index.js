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
        'variable_length' : typeof opts.variable_length === 'undefined' ? true : opts.variable_length,
        'punctuation' : typeof opts.punctuation === 'undefined' ? false : opts.punctuation
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
    
    this.corpus = text.replace(/[,.!?;\-…\n\t]/g, '').split(' ');
    this.corpus_len = this.corpus.length

    this._counter = 0;
}

Poem.prototype.generate = function generate() {
    this._counter = 0;

    var stanzas = [];

    while ( this._counter < this.corpus_len ) {
        stanzas.push(this._makeStanza());
    }

    return stanzas.join(this.options.new_stanza);
}

Poem.prototype._randomPunctuation = function randomPunctuation() {
    var props = [];
    for ( var p in this.punctuation ) {
        props.push(p);
    }

    return this.punctuation[props[Math.floor(Math.random() * props.length)]];
}

Poem.prototype._lineLength = function linelength() { 
    return Math.ceil(Math.random() * this.options.max_line_length); 
}

Poem.prototype._stanzaLength = function stanzaLength() {
    return Math.ceil(Math.random() * this.options.max_stanza_length);
}

Poem.prototype._makeLine = function makeline() {
    var line = []
      , word = ''
      , i = 0
      , line_length = this.options.variable_length 
                    ? this._lineLength() 
                    : this.options.max_line_length;

    while ( i < line_length && this._counter < this.corpus_len ) {
        word = this.corpus[this._counter++];

        if ( this.options.punctuation ) {
            word += this.options.coinflip() ? this._randomPunctuation() : '';
        }

        line.push(word);
        i++;
    }

    return line.join(' ')
}

Poem.prototype._makeStanza = function makeStanza() {
    var stanza = []
      , i = 0
      , stanza_length = this.options.variable_length 
                      ? this._stanzaLength() 
                      : this.options.max_stanza_length
        ;

    while ( i < stanza_length && this._counter < this.corpus_len ) {
        stanza.push( '' + (this.options.coinflip() ? this.options.indent : '') + this._makeLine() )
        i++;
    }

    return stanza.join(this.options.new_line);
}