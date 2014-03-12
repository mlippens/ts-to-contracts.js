ts-to-contracts.js
==================

This is a work in progress.
To explain what it actually does: I expanded the esprima parser to accept Typescript syntax and parse it to a format so that I have enough information in order to know what it means. Then I use falafel to operate a transformation on that AST source code. Since the parser holds ranges in it's AST, we don't need to actually regenerate the code, which would also mean adapting a generator. Instead, we use falafel to update the source code and transform it to our liking.

The goal is to transform Typescript to Javascript with contracts applied.

To use this tool, enter `./bin/ts-tocontracts [path-to-ts-file].ts`. This will create a `.js` file with the same name on the same location, compiled to contracts.
