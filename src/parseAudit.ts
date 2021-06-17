import fs from "fs";
import readline from "readline";
import { Entry, Stage } from "./data";

export async function parseAudit(cb: (data: Map<string, number>) => void) {
  const file = readline.createInterface({
    input: fs.createReadStream("audit.log"),
    output: process.stdout,
    terminal: false
  });

  const counter = new Map<string, number>();

  file.on("line", (line) => {
    const entry: Entry = JSON.parse(line);

    if (entry.stage !== Stage.ResponseComplete) return;

    if (counter.has(entry.user.username)) {
      const nValue = counter.get(entry.user.username) as number + 1;
      counter.set(entry.user.username, nValue);
    } else {
      counter.set(entry.user.username, 1);
    }
  });

  counter[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
  }

  file.on("close", () => {
    cb(counter);
  });
}
