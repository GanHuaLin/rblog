function info(msg) {
  console.log(`[INFO] ${msg}`);
}

function err(msg, err) {
  console.log(`[ERROR] ${msg}`);
  console.log(err);
}

module.exports = {
  info,
  err
};
