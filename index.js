const fs = require("fs");
const glob = require("glob");

module.exports = () => {
  glob("{,!(node_modules)/**/}*.md", (err, files) => {
    files.forEach(file => {
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          return console.log(err);
        }
        // Bless regex gods: https://www.reddit.com/r/regex/comments/f07tl2/javascript_regex_for_live_markdown_substitution/fgs4s8g/
        const result = data.replace(
          /(?:[^*]|^)\*([^*]+?)(?!\*\*)\*/g,
          (a, b) => a[0] + "✨" + b + "✨"
        );
        fs.writeFile(file, result, err => {
          if (err) return console.log(err);
        });
      });
    });
  });
};
