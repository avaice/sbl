import { UndefinedVariableError } from "./exception";
import { AvailableTypes } from "./types";

export const separator = (code: string) => {
  const op = code.split(" ")[0];
  const argsPart = code.slice(op.length + 1);

  let isInQuotes = false;
  const args: string[] = [];
  for (let i = 0; i < argsPart.length; i++) {
    const char = argsPart[i];
    if (char === '"' && (i === 0 || argsPart[i - 1] !== "\\")) {
      isInQuotes = !isInQuotes;
    } else if (char === " ") {
      continue;
    } else {
      let arg = "";
      while (true) {
        if (i === argsPart.length || (!isInQuotes && argsPart[i] === " ")) {
          break;
        }
        if (argsPart[i] !== '"') {
          arg += argsPart[i];
        } else {
          isInQuotes = !isInQuotes;
        }
        i++;
      }
      args.push(arg);
    }
  }

  return {
    op,
    args,
  };
};

export const textgen = (
  template: string,
  memory: Map<string, AvailableTypes>
) => {
  const getValue = (key: string) => {
    const value = memory.get(key);
    if (!value) {
      throw new UndefinedVariableError(`Undefined variable: ${key}`);
    }
    return value.toString();
  };
  if (!template.startsWith('"')) {
    return getValue(template);
  }

  const content = template.replace('"', "");
  return content.replace(/(\{\w+\})/g, (match) => {
    const key = match.slice(1, -1);
    return getValue(key);
  });
};
