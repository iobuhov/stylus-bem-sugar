# Stylus BEM Sugar
Collection of [Stylus](https://github.com/stylus/stylus) mixins that help write code in [BEM](https://en.bem.info/) notation.

- [Installation](#installation)
- [Javascript API](#javascript-api)
- [Usage](#usage)
	- [Examples](#examples)
		- [Block](#block)
		- [Element](#element)
		- [Modifier](#modifier)
		- [Nesting](#nesting)
		- [Group](#group)
- [Using with Gulp](#using-with-gulp)
- [Contributions](#contributions)

## Installation

```bash
$ npm install stylus-bem-sugar
```

## Javascript API

```javascript
var stylusBemSugar = require('stylus-bem-sugar'),
    stylus = require('stylus');

function compileStylus(str) {
	return stylus(str)
           .use(stylusBemSugar());
}
```
### Options:
You can customize produced selectors by passing options object
to module call with appropriate values:
```javascript
var options = {
  elementPrefix: '__',
  modifierPrefix: '--',
  modifierDelimiter: '_'
}

stylusBemSugar(options);
```

## Usage

To use mixins import them in your stylus file:
```stylus
@import 'bem-shugar'
```

### Examples

#### Block

```stylus
+b('header')
  color: blue
```
Compiles to:
```css
.header {
  color: #00f;
}
```

#### Element

```stylus
+b('header')
  color: blue
  +e('logo')
    float: left
```
Compiles to:
```css
.header {
  color: #00f;
}
.header__logo {
  float: left;
}
```

#### Modifier

```stylus
+b('header')
  color: blue
  +m('theme', 'seagreen') // accepte optional mod value arg
    background-color: green

  +e('logo')
    float: left
    +m('absolute')
      position: absolute;
```
Compiles to:
```css
.header {
  color: #00f;
}
.header--theme_seagreen {
  background-color: #008000;
}
.header__logo {
  float: left;
}
.header__logo--absolute {
  position: absolute;
}
```

#### Nesting

Elements can nest in mods:
```stylus
+b('header')
  +m('theme', 'seagreen')
    +e('foo')
      color: #333
```
Compiles to:
```css
.header--theme_seagreen .header__foo {
  color: #333;
}
```
Elements can nest in elements:
```stylus
  +e('nav')
    +e('nav-item')
      font-size: 1.5em
```
Compiles to:
```css
.header__nav .header__nav-item {
  font-size: 1.5em;
}
```
Depth is not limited
```stylus
+b('header')
  +m('level1')
    +e('level2')
      +e('level3')
        +m('level4')
          +e('level5')
            // ...
            color: #000
```
Compiles to:
```css
.header--level1 .header__level2 .header__level3--level4 .header__level5 {
  color: #000;
}
```
#### Group
In some cases you can group your selectors by using special `group` mixin:
```stylus
+b('header')
  // Note:
  // 1. mixins should be called without `+` prefix
  // 2. style rules should be placed on the
  //    same indentation level
  +group()
    e('foo')
    e('baz')
    e('bar')
    e('egg')
    color: #333
    line-height: 1.2

  // Mods also can be grouped
  +group()
    m('mod1')
    m('mod2')
    color: #747474
    font-size: 12px
```
Compiles to:
```css
.header__foo,
.header__baz,
.header__bar,
.header__egg {
  color: #333;
  line-height: 1.2;
}
.header--mod1,
.header--mod2 {
  color: #747474;
  font-size: 12px;
}
```
## Using with Gulp
```javascript
// ...
var stylus = require('gulp-stylus');
var stylusBemSugar = require('stylus-bem-sugar');

var options = {
  stylus: {
    use: stylusBemSugar()
  }
}

galp.task('compile:stylus', function() {
  return gulp.src('src/main.styl')
    .pipe(stylus(options.stylus))
    .pipe(gulp.dest('public/css/'))
});
// ...
```
## Contributions
Please, if you find a bug, write an issue or make a pull request.
