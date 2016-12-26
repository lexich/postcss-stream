# Work in process

# PostCSS Stream [![Build Status][ci-img]][ci]

[PostCSS] plugin add support stream.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/lexich/postcss-stream.svg
[ci]:      https://travis-ci.org/lexich/postcss-stream

Add support to postcss stream api. 
```js
const postcssStream = require('postcss-stream');

const stream1 = postcssStream.createStream({
   // select only nodes with type="decl" prop="color" value="red"
   query: {
        decl: {
            prop: "color",
            value: "red"
        }
   },
   fn(decl) {
     decl.value = "green";
   }
});

postcssStream([
  stream, ...
]);

```

Documentation in process.