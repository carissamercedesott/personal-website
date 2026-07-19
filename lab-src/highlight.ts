// Minimal TS/TSX highlighter for the lab's view-source panels. One regex
// pass, longest-first alternation; template literals are colored whole
// (interpolations included) — close enough for display.
const TOKEN =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\[\s\S])*`)|\b(0x[\da-fA-F]+|\d+(?:\.\d+)?)\b|\b(const|let|var|function|return|if|else|for|while|do|of|in|new|typeof|instanceof|void|delete|class|extends|super|import|export|from|default|async|await|yield|try|catch|finally|throw|switch|case|break|continue|type|interface|enum|implements|as|satisfies|keyof|readonly|static|get|set|true|false|null|undefined|this)\b/g;

const CLASSES = ["tok-comment", "tok-string", "tok-number", "tok-keyword"];

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const highlight = (source: string) => {
  let html = "";
  let last = 0;
  for (const match of source.matchAll(TOKEN)) {
    html += escapeHtml(source.slice(last, match.index));
    const cls = CLASSES[match.slice(1).findIndex((group) => group !== undefined)];
    html += `<span class="${cls}">${escapeHtml(match[0])}</span>`;
    last = match.index + match[0].length;
  }
  return html + escapeHtml(source.slice(last));
};
