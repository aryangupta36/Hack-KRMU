function saveHistory(entry) {
  const raw = fs.readFileSync("history.json");
  const history = JSON.parse(raw);

  history.push(entry);

  fs.writeFileSync("history.json", JSON.stringify(history, null, 2));
}

exports.module = { saveHistory };