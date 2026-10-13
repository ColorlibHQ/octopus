import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('.');
let pages=0,links=0;
for(const name of await readdir(root)){
 if(!name.endsWith('.html'))continue;
 const html=await readFile(path.join(root,name),'utf8');pages++;
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const url=match[1];if(/^(?:https?:|data:|#)/.test(url))continue;
  const file=path.join(root,url.split(/[?#]/)[0]);await stat(file);links++;
 }
 if(!html.includes('id="main"')||!html.includes('lang="en"'))throw new Error(`Missing document structure: ${name}`);
}
console.log(`${pages} pages; ${links} local references verified.`);
