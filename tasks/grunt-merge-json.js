/*
**  grunt-merge-json -- Grunt Task for Merging Multiple JSON Files
**  Copyright (c) 2013 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* global module: false */
module.exports = function (grunt) {
    grunt.registerMultiTask("merge-json", "Merge JSON Files", function () {
        /*  prepapre options  */
        var options = this.options({});
        grunt.verbose.writeflags(options, "Options");

        /*  iterate over all src-dest file pairs.  */
        this.files.forEach(function (f) {
            var json = {};
            f.src.forEach(function (src) {
                if (!grunt.file.exists(src))
                    grunt.log.warn("JSON source file \"" + src + "\" not found.");
                else {
                    var fragment = grunt.file.readJSON(src);
                    json = grunt.util._.extend(json, fragment);
                }
            });
            grunt.file.write(f.dest, json);
            grunt.log.writeln("JSON destination file \"" + f.dest + "\" created.");
        });
    });
};
