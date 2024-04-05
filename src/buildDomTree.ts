import { tag } from "./types";

export const buildDomTree = (tokens: tag[]) => {
  let root = null;
  const stack = [];
  while (tokens.length) {
    const curNode = tokens.shift();
    if (curNode?.type === "start") {
      if (!root) {
        root = curNode;
      } else {
        if (!stack[stack.length - 1]!.children) {
          stack[stack.length - 1]!.children = [curNode];
        } else {
          stack[stack.length - 1]!.children!.push(curNode);
        }
      }
      if (!curNode.selfClose) {
        stack.push(curNode);
      }
      continue;
    } else if (curNode?.type === "end") {
      stack.pop();
      continue;
    } else if (curNode?.type === "text") {
      if (stack[stack.length - 1]?.children) {
        stack[stack.length - 1]!.children!.push(curNode);
      } else {
        stack[stack.length - 1]!.children = [curNode];
      }
      continue;
    }
  }
  return root;
};
