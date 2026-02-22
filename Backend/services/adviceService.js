function getAdvice(disease) {
  const raw = fs.readFileSync("advice.json");
  const data = JSON.parse(raw);

  return (
    data[disease] || {
      pesticide: "Unknown",
      soil: "Consult expert",
      plan: [],
    }
  );
}

exports.module = { getAdvice };