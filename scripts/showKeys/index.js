const path = require("path");
const rootDir = path.join(__dirname, "../../");
async function async() {
  console.log("run scripts/extract");
  require(path.join(rootDir, "scripts/extract/"))();

  console.log("run scripts/showKeys/");
  await require(path.join(rootDir, "scripts/showKeys/showKeys"))();

  console.log("run scripts/import");
  require(path.join(rootDir, "scripts/import/"))();
}
module.exports = () => {
  async();
};
