const fs = require("fs");
const path = require("path");
// const trads = fs.readFileSync("./trads.txt", "utf8");
// fs.readFileSync('<directory>');

let trads = fs
  .readFileSync(path.join(__dirname, "./trads.txt"), "utf-8")
  .toString()
  .split("\n");

trads.forEach(line => {
  line = line.split(" #R# ").map(value => value.replace("\r", ""));

  const val = line[0];
  let key = line[1].toLowerCase();

  console.log(`${key},${val}`);
});
