var util = require('util');

module.exports = function() {
    
    var logger = function() {
        this.name = 'console';

        this.colors = {
            'debug': 248,
            'res': 110,
            'req': 82,
            'info': 27,
            'warn': 202,
            'error': 160,
            'sys': 82
        };

        this.useSymbols = false;

        // ☉ ☒ ☕ ☙ ☠ ⚠ ⚡ ⚫ ✅ ✔ ✘ ✘ ❌ ❎ ➜ ‼ ⁇ ⌨

        this.__levels = {
            'debug': {
                color: '255',
                bgcolor: '248',
                symbol: '⁇',
                text: 'debug'
            },
            'info': {
                color: '255',
                bgcolor: '27',
                symbol: ' ',
                text: 'info'
                //suffix: '▸'
            },
            'data': {
                color: '255',
                bgcolor: '248',
                symbol: '➜',
                text: 'data'
            },
            'req': {
                color: '255',
                bgcolor: '82',
                symbol: '→',
                text: 'req'
            },
            'res': {
                color: '255',
                bgcolor: '110',
                symbol: '←',
                text: 'res'
            },
            'warn': {
                color: '255',
                bgcolor: '202',
                symbol: '‼',
                text: 'warn'
            },
            'error': {
                color: '196',
                bgcolor: '196',
                symbol: '✘',
                text: 'error'
            },
            'sys': {
                color: '250',
                bgcolor: '33',
                symbol: '⚡',
                text: 'sys'
            }
        };

        this.logLevels = {
            debug: 0,
            info: 1,
            data: 2,
            res: 3,
            req: 4,
            sys: 5,
            warn: 6,
            error: 7
        };

        this.cliCodes = {
            red: 1,
            green: 2,
            yellow: 3,
            blue: 12,
            fire: 196,
            orange: 208,
            azure: 33,
            lime: 154,
            pink: 199,
            plum: 57,
            turq: 39,
            ored: 202,
            grey: 247,
            dgrey: 244,
            ddgrey: 241,
            lgrey: 250,
            llgrey: 254
        };
    };



    var strRepeat = function(str, num) {
        var newStr = '';
        while (num > 0) {
            newStr += str;
            num--;
        }

        return newStr;
    };

    logger.prototype.log = function(type, msg, data) {
        // console.log('Loging of type', type, msg, data);
        var indent = type.length + 2;

        var typeStr = this.colorifyType(type);

        if (data.length > 0) {
            data = this.stringify(data[0], indent);
            data = this.indent(data, type);
            process.stdout.write(typeStr + ' ' + this.colorifyMessage(msg) + data + '\n');
        }
        else {
            process.stdout.write(typeStr + ' ' + this.colorifyMessage(msg) + '\n');
        }
    };

    /**
     * Colorify a logger message
     *
     * @method colorfyMessage
     * @param {String} msg Message
     */
    logger.prototype.colorifyMessage = function(msg) {
        var msgStr = '';

        msg.forEach(function(m) {
            if (m[0]) {
                var color = '';
                var style = '';
                m[0].split(' ').forEach(function(curStyle) {
                    switch (curStyle) {
                        case 'bold': style += '5;'; break;
                        case 'underline': style += '1;'; break;
                        case 'blink': style += '5;'; break;
                        default: color = this.cliCodes[curStyle] || 255;
                    }

                }.bind(this));

                msgStr += '\u001b[38;' + (style || '5;') + color + 'm' + m[1] + '\u001b[m';
            }
            else {
                msgStr = m[1];
            }
        }.bind(this));

        return msgStr;
    };

    logger.prototype.colorifyType = function(type) {
        if (this.useSymbols) {
            var conf = this.__levels[type];
            type = conf.symbol + ' \033[38;5;' + conf.color + ';48;5;' + conf.bgcolor + 'm \033[m';
            if (conf.suffix) {
                type = type + '\033[38;5;' + conf.bgcolor + 'm' + conf.suffix + '\033[m';
            }
        }
        else {
            var col = this.__levels[type].bgcolor;
            if (col) {
                type = '\033[38;5;' + col + 'm' + this.__levels[type].text + '\033[m:';
            }
        }

        return type;
    };

    logger.prototype.stringify = function(data, indent) {
        var nl = this.useSymbols ? '\n' : ' ',
            indentStr = this.useSymbols ? strRepeat(' ', indent) : '';

        switch (typeof data) {
            case 'string':
                data = nl + indentStr + '\033[38;5;250m"' + data + '"\033[m';
                break;
            case 'object':
                if (data === null) {
                    data = nl + ' \033[38;5;33mnull\033[m';
                }
                else {
                    data = nl + util.inspect(data, { showHidden: false, depth: null, colors: true });
                }
                break;
            case 'undefined':
                data = ' \033[38;5;201mundefined\033[m';
                break;
            case 'boolean':
                data = ' ' + (data ? '\033[38;5;201mtrue' : '\033[38;5;201mfalse') + '\033[m';
                break;
            case 'number':
                data = ' \033[38;5;214m' + String(data) + '\033[m';
                break;
            case 'function':
                data = ' \033[38;5;148m' + data.toString() + '\033[m';
                break;
        }

        return data;
    };

    logger.prototype.indent = function(data, type) {
        var conf = this.__levels[type];

        if (this.useSymbols && data) {
            var indentWith = strRepeat(' ', conf.symbol.length) + ' \033[48;5;' + conf.bgcolor + 'm \033[m  ';
            data = data.replace(/\n/g, '\n' + indentWith);
        }
        return data;
    };

    return logger;
}();