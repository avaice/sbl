import { separator, textgen } from "./tools";
import { AvailableTypes } from "./types";

const memory = new Map<string, AvailableTypes>();

export function execute(code: string) {
  const { op, args } = separator(code);

  console.log(op, args);

  const generatedArgs = args.map((arg) => {
    if (arg.startsWith("{")) {
      return textgen(arg, memory);
    }
    return arg;
  });

  switch (op) {
    case "P":
      console.log(textgen(generatedArgs[0], memory));
      break;
  }
}
