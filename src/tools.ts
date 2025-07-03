import { UndefinedVariableError } from "./exception";
import { AvailableTypes } from "./types";

export const separator = (code: string) => {
  const [op, ...args] = code.split(" ");

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
