## WebClub Blog

[![Build Status](https://travis-ci.org/WebClub-NITK/blog.svg?branch=master)](https://travis-ci.org/WebClub-NITK/blog)
[![Ruby](https://img.shields.io/badge/ruby-2.5.1-blue.svg?style=flat)](https://travis-ci.org/WebClub-NITK/blog)
[![Jekyll](https://img.shields.io/badge/jekyll-3.7.4-blue.svg?style=flat)](https://travis-ci.org/WebClub-NITK/blog)

Repository for the WebClub Blog

### Author Pages

In order to properly generate author pages you need to rename the field *author* in the
front matter of every post to match that of your each author's *username* as defined
in the *[\_data/authors.yml](_data/authors.yml)* file.
With the latest update, multiple author blogs are now supported out of the box.

### Compiling 

``` bash
git clone https://github.com/WebClub-NITK/blog/
cd blog/
bundle exec jekyll build
bundle exec jekyll serve
```

## Issues and Contributing

This install builds well with Ruby v2.5.1 and Jekyll v3.7.4. If you run into any problems
please log them on the [issue tracker](https://github.com/jekyller/jasper2/issues).

Feel free pull-request your patches and fixes.

## Thanks

Many thanks to the Ghost team for all the design work. Also many thanks to all contributors,
that help keeping the project alive and updated :smile:
