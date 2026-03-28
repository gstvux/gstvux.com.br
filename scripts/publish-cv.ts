import fs from 'node:fs';
import path from 'node:path';
import { 
  GlobalCvRecord, 
  extractExtension, 
  normalizeFormat, 
  getNextVersion, 
  buildCvFilename, 
  hasFileChanged,
  formatMonthYearPtBr
} from '../src/utils/cv-publisher';

const PROJECT_ROOT = process.cwd();
const CV_JSON_PATH = path.join(PROJECT_ROOT, 'src/content/global/cv.json');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const CV_TARGET_DIR = path.join(PUBLIC_DIR, 'cv');

async function main() {
  console.log('🚀 Iniciando fluxo de publicação do CV...');

  if (!fs.existsSync(CV_JSON_PATH)) {
    console.error(`❌ Erro: Arquivo de controle não encontrado em ${CV_JSON_PATH}`);
    process.exit(1);
  }

  const cvData: GlobalCvRecord = JSON.parse(fs.readFileSync(CV_JSON_PATH, 'utf-8'));

  if (!cvData.file) {
    console.error('⚠️ Aviso: Nenhum arquivo de CV selecionado no CMS.');
    process.exit(0);
  }

  // Se o arquivo já começa com /cv/ e o nome corresponde ao padrão, 
  // pode ser que não tenha havido mudança real ou o script já rodou.
  const isAlreadyPublished = cvData.file.startsWith('/cv/');
  
  // A detecção real de mudança: o campo 'file' do CMS aponta para onde foi feito o upload temporário.
  // Se 'file' for diferente de 'href', significa que houve um novo upload.
  const fileChanged = hasFileChanged(cvData.href, cvData.file);

  if (!fileChanged && isAlreadyPublished) {
    console.log('✅ Nenhuma alteração detectada no arquivo do CV. Nada a publicar.');
    
    // Resetar isMajorUpdate por segurança se ele estiver true
    if (cvData.isMajorUpdate) {
        cvData.isMajorUpdate = false;
        fs.writeFileSync(CV_JSON_PATH, JSON.stringify(cvData, null, 2), 'utf-8');
        console.log('♻️ Resetado isMajorUpdate para false.');
    }
    process.exit(0);
  }

  console.log('📦 Novo arquivo detectado. Iniciando pipeline...');

  const sourceRelPath = cvData.file.startsWith('/') ? cvData.file.slice(1) : cvData.file;
  const sourceFullPath = path.join(PUBLIC_DIR, sourceRelPath);

  if (!fs.existsSync(sourceFullPath)) {
    console.error(`❌ Erro: Arquivo de origem não encontrado em ${sourceFullPath}`);
    process.exit(1);
  }

  const extension = extractExtension(sourceFullPath);
  if (extension !== 'pdf') {
     console.warn('⚠️ Aviso: O arquivo enviado não é um PDF. Prosseguindo, mas verifique se isso é desejado.');
  }

  const format = normalizeFormat(extension);
  const updatedAt = new Date().toISOString();
  
  const isFirstPublish = !cvData.version || !cvData.href;
  const nextVersion = getNextVersion({
    currentVersion: cvData.version,
    isMajorUpdate: !!cvData.isMajorUpdate,
    isFirstPublish
  });

  const targetFilename = buildCvFilename({
    updatedAt,
    version: nextVersion,
    extension
  });

  const targetRelPath = `cv/${targetFilename}`;
  const targetFullPath = path.join(PUBLIC_DIR, targetRelPath);

  // Garantir que a pasta public/cv existe
  if (!fs.existsSync(CV_TARGET_DIR)) {
    fs.mkdirSync(CV_TARGET_DIR, { recursive: true });
  }

  console.log(`🚚 Movendo arquivo: ${sourceRelPath} -> ${targetRelPath}`);
  
  // Copia o arquivo para o destino canônico
  // Não deletamos o original caso o TinaCMS precise dele para referências futuras ou deleção interna
  fs.copyFileSync(sourceFullPath, targetFullPath);

  // Se o arquivo original estava na raiz do public ou uploads e não era o arquivo final atual, 
  // poderíamos deletar, mas a especificação sugere manter o histórico físico.
  
  // Atualizar o registro JSON
  const updatedRecord: GlobalCvRecord = {
    ...cvData,
    file: '/' + targetRelPath,
    href: '/' + targetRelPath,
    extension,
    format,
    version: nextVersion,
    updatedAt,
    isMajorUpdate: false,
  };

  // Gerar o publicMeta amigável
  const dateFormatted = formatMonthYearPtBr(updatedAt);
  updatedRecord.publicMeta = `${format} • ${cvData.language || 'PT-BR'} • v${nextVersion} • Atualizado em ${dateFormatted}`;

  fs.writeFileSync(CV_JSON_PATH, JSON.stringify(updatedRecord, null, 2), 'utf-8');

  console.log(`✨ Sucesso! CV publicado como versão ${nextVersion}.`);
  console.log(`🔗 Link: ${updatedRecord.href}`);
}

main().catch(err => {
  console.error('❌ Erro inesperado no script de publicação:', err);
  process.exit(1);
});
