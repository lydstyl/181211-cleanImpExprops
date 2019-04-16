const path = require("path");
const rootDir = path.join(__dirname, "../../");
async function async() {
  console.log("yyyyy");
}
module.exports = () => {
  async();
};
