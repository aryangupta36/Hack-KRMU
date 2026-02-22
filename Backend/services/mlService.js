
function runML(imagePath) {
  return new Promise((resolve, reject) => {
    const py = spawn("python", ["ml.py", imagePath]);

    py.stdout.on("data", (data) => {
      resolve(data.toString().trim());
    });

    py.stderr.on("data", (err) => {
      reject(err.toString());
    });
  });
}

exports.module = { runML };