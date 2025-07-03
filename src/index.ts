import { readFile } from "fs/promises";
import { execute } from "./executor";

async function main(path: string) {
  const file = await readFile(path, "utf-8");
  execute(file);
}

main(process.argv[2]);
