import { UndefinedVariableError } from "./exception";
import { AvailableTypes } from "./types";

export const separator = (code: string) => {
  const op = code.split(" ")[0];
  const argsPart = code.slice(op.length + 1);

  let isInQuotes = false;
  const args: string[] = [];
  for (let i = 0; i < argsPart.length; i++) {
    const char = argsPart[i];
    if (char === " ") {
      continue;
    } else {
      let arg = "";
      while (true) {
        if (argsPart[i] === '"' && (i === 0 || argsPart[i - 1] !== "\\")) {
          isInQuotes = !isInQuotes;
        }
        if (i === argsPart.length || (!isInQuotes && argsPart[i] === " ")) {
          break;
        }
        arg += argsPart[i];
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

  const result = template.replace(/(\{\w+\})/g, (match) => {
    const key = match.slice(1, -1); // Remove the curly braces
    return getValue(key);
  });

  if (template.startsWith('"')) {
    return result.slice(1, -1); // Remove the surrounding quotes
  }

  return result;
};
