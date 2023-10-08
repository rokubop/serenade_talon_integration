const Tail = require("tail-file");
const path = require("path");

// put your path to the parrot log file here.
const file = path.normalize(
  "C:\\Users\\{UserName}\\AppData\\Roaming\\talon\\parrot.log"
);

let cachedApi;

// you need to initiate some command to enable a cachedApi
// which can always be triggered
serenade.global().command("start parrot", (api) => {
  console.log("Starting to listen to parrot");
  cachedApi = api;
});

let tail = new Tail(file);

tail.on("line", (line) => {
  if (line.includes("pop")) {
    executeParrotCommand("pop");
  } else if (line.includes("hiss")) {
    executeParrotCommand("hiss");
  }
});

tail.on("error", (error) => {
  console.log("ERROR: ", error);
});

tail.start();

function executeParrotCommand(type) {
  const api = cachedApi;
  if (api) {
    if (type === "pop") {
      void api.runCommand("click");
    } else if (type === "hiss") {
      void api.runCommand("scroll down");
    }
  }
}
