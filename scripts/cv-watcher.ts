import fs from 'node:fs';
import path from 'node:path';
import { GlobalCvRecord, hasFileChanged } from '../src/utils/cv-publisher';

const CV_JSON_PATH = path.join(process.cwd(), 'src/content/global/cv.json');

console.log('👀 Monitor de CV iniciado. Avisarei se uma publicação for necessária.');

// Usando watchFile para maior compatibilidade em diferentes sistemas de arquivos (WSL/Docker/Linux)
fs.watchFile(CV_JSON_PATH, { interval: 1000 }, (curr, prev) => {
  if (curr.mtime <= prev.mtime) return;

  try {
    const data: GlobalCvRecord = JSON.parse(fs.readFileSync(CV_JSON_PATH, 'utf-8'));
    
    if (hasFileChanged(data.href, data.file)) {
      console.log('\n\x1b[33m%s\x1b[0m', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\x1b[33m%s\x1b[0m', '⚠️  MUDANÇA NO CV DETECTADA!');
      console.log('\x1b[33m%s\x1b[0m', 'Um novo arquivo foi carregado via CMS.');
      console.log('\x1b[1m%s\x1b[0m', '👉 Execute: pnpm cv:publish  para oficializar a versão.');
      console.log('\x1b[33m%s\x1b[0m', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }
  } catch (e) {
    // Silencioso se o arquivo estiver sendo escrito no momento
  }
});
