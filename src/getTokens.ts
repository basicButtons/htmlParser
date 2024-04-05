import { tag } from "./types";

const startTagReg = /^<([a-zA-Z_][\w]*)(?:\s*)?(\/)?>/;
const endTagReg = /^<\/([a-zA-Z_][\w]*)(?:\s*)?>/;
export function getTokens(html: string) {
  const tokens: tag[] = [];
  let rawHtml = html.trim().replace(/\n/g, "");
  function advance(num: number) {
    rawHtml = rawHtml.slice(num);
  }
  function handleStartTag(match: RegExpMatchArray) {
    const startTagLength = match[0].length;
    advance(startTagLength);
    const tagNode: tag = {
      type: "start",
      tag: match[1],
      selfClose: !!match[2],
    };
    tokens.push(tagNode);
  }
  function handleEndTag(match: RegExpMatchArray) {
    const startTagLength = match[0].length;
    advance(startTagLength);
    const tagNode: tag = {
      type: "end",
      tag: match[1],
    };
    tokens.push(tagNode);
  }

  function handleText() {
    const textEnd = rawHtml.indexOf("<");
    // 现在的情况就是匹配文本了
    if (textEnd >= 0) {
      const tag: tag = {
        type: "text",
        text: rawHtml.slice(0, textEnd),
      };
      tokens.push(tag);
      advance(textEnd);
    } else {
      const tag: tag = {
        type: "text",
        text: rawHtml,
      };
      tokens.push(tag);
      rawHtml = "";
    }
  }

  while (rawHtml.length) {
    rawHtml = rawHtml.trim();
    const startMatch = rawHtml.match(startTagReg);
    // console.log(startMatch)
    if (startMatch) {
      handleStartTag(startMatch);
      continue;
    }
    const endMatch = rawHtml.match(endTagReg);
    if (endMatch) {
      handleEndTag(endMatch);
    } else {
      handleText();
    }
  }
  return tokens;
}
