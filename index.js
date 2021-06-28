const server = require('./src/app');
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`start listen ${process.env.PORT}`);
});
