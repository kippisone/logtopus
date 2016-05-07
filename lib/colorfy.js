'use strict';

class Colorfy {
  constructor() {
    this.text = [];
  }

  /**
   * Draws red text
   *
   * @method red
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  red(text, styles) {
    this.text.push([this.getColorCode('160', styles), text]);
    return this;
  }

  /**
   * Draws yellow text
   *
   * @method yellow
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  yellow(text, styles) {
    this.text.push([this.getColorCode('226', styles), text]);
    return this;
  }

  /**
   * Draws green text
   *
   * @method green
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  green(text, styles) {
    this.text.push([this.getColorCode('34', styles), text]);
    return this;
  }

  /**
   * Draws blue text
   *
   * @method blue
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  blue(text, styles) {
    this.text.push([this.getColorCode('21', styles), text]);
    return this;
  }

  /**
   * Draws fire text
   *
   * @method fire
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  fire(text, styles) {
    this.text.push([this.getColorCode('196', styles), text]);
    return this;
  }

  /**
   * Draws orange text
   *
   * @method orange
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  orange(text, styles) {
    this.text.push([this.getColorCode('208', styles), text]);
    return this;
  }

  /**
   * Draws azure text
   *
   * @method azure
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  azure(text, styles) {
    this.text.push([this.getColorCode('33', styles), text]);
    return this;
  }

  /**
   * Draws lime text
   *
   * @method lime
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  lime(text, styles) {
    this.text.push([this.getColorCode('148', styles), text]);
    return this;
  }

  /**
   * Draws pink text
   *
   * @method pink
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  pink(text, styles) {
    this.text.push([this.getColorCode('199', styles), text]);
    return this;
  }

  /**
   * Draws plum text
   *
   * @method plum
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  plum(text, styles) {
    this.text.push([this.getColorCode('93', styles), text]);
    return this;
  }

  /**
   * Draws turq text
   *
   * @method turq
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  turq(text, styles) {
    this.text.push([this.getColorCode('39', styles), text]);
    return this;
  }

  /**
   * Draws ored text
   *
   * @method ored
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  ored(text, styles) {
    this.text.push([this.getColorCode('202', styles), text]);
    return this;
  }

  /**
   * Draws grey text
   *
   * @method grey
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  grey(text, styles) {
    this.text.push([this.getColorCode('247', styles), text]);
    return this;
  }

  /**
   * Draws dgrey text
   *
   * @method dgrey
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  dgrey(text, styles) {
    this.text.push([this.getColorCode('244', styles), text]);
    return this;
  }

  /**
   * Draws ddgrey text
   *
   * @method ddgrey
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  ddgrey(text, styles) {
    this.text.push([this.getColorCode('241', styles), text]);
    return this;
  }

  /**
   * Draws lgrey text
   *
   * @method lgrey
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  lgrey(text, styles) {
    this.text.push([this.getColorCode('250', styles), text]);
    return this;
  }

  /**
   * Draws llgrey text
   *
   * @method llgrey
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  llgrey(text, styles) {
    this.text.push([this.getColorCode('254', styles), text]);
    return this;
  }

  /**
   * Draws lbrown text
   *
   * @method lbrown
   * @param  {String} text   Text to be colorfied
   * @param  {String} styles Text styles (bold underlined)
   * @chainable
   * @return {object}        Returns this value
   */
  lbrown(text, styles) {
    this.text.push([this.getColorCode('315', styles), text]);
    return this;
  }

  txt(text) {
    this.text.push(['', text]);
    return this;
  }

  /**
   * Returns a coloried String
   *
   * @return {String} Returns a colorfied string
   */
  colorfy(printColors) {
    if (printColors === false) {
      return this.text.map(txt => txt[1]).join(' ');
    }

    let colorfied = this.text.map(txt => {
      return txt[0] + txt[1] + '\u001b[m';
    }).join(' ');

    this.text = [];
    return colorfied;
  }

  getColorCode(color, styles) {
    let style = '';

    if (styles) {
      styles.split(' ').forEach(curStyle => {
          switch (curStyle) {
              case 'bold': style += '5;'; break;
              case 'underline': style += '1;'; break;
              case 'blink': style += '5;'; break;
          }
      });
    }

    return '\u001b[38;' + (style || '5;') + color + 'm';
  }
}

module.exports = new Colorfy();
