import { buildDomTree } from "./buildDomTree";
import { getTokens } from "./getTokens";

const html = `
<html >
  <head>
    <meta/>
    <meta/>
    <title>Document</title>
  </head>
  <body></body>
</html>
`;

const tokens = getTokens(html);
const ast = buildDomTree([...tokens]);
console.log(ast);

// res :
// {
//   type: 'start',
//   tag: 'html',
//   selfClose: false,
//   children: [
//     { type: 'start', tag: 'head', selfClose: false, children: [Array] },
//     { type: 'start', tag: 'body', selfClose: false }
//   ]
// }
