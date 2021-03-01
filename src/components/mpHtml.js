import {parse} from "node-html-parser";

export function tagStyle(key) {
  let base = {
    a: 'color:#0645ad;', // a 标签默认为红色.
    td: 'display:inline-block',
    th: 'display:inline-block',
    span: 'display: inline-block',
    ul: 'text-align:center;vertical-align:center;',
    li: 'display:inline-block',
    h1: 'font-size: 21px; font-weight: bold;',
    h2: 'font-size: 20px; font-weight: bold;',
    h3: 'font-size: 19px; font-weight: bold;',
    h4: 'font-size: 18px; font-weight: bold;'
  };

  if (key == 'Template:Mainmenu') {
    base.p = 'display:inline-block';
    return base
  } else {
    return base
  }
}

export function bleach(raw) {
  let content = parse(raw);
  console.log(content)
  content.querySelectorAll('.mw-editsection').forEach((n, i) => {
    n.remove();
  });

  content.querySelectorAll('#stub').forEach((n, i) => {
    n.remove();
  });

  content.querySelectorAll('img').forEach((n, i) => {
    if (n.rawAttrs.indexOf('Jinxed.png') >= 0) {
      let p = n.parentNode;
      while (p.rawTagName !== 'table') {
        p = p.parentNode;
        if (p == undefined) {
          break;
        }
      }
      p.remove();
    }
  });

  content.querySelectorAll('p').forEach((n, i) => {
    if (n.innerText.indexOf('本文或部分尚未完全翻译成中文') >= 0) {
      n.remove();
    } else if (n.innerText.indexOf('不完整的翻译') >= 0) {
      n.remove();
    }
  });

  return content.toString();
}
