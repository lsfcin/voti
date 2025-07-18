const https = require('https');
const fs = require('fs');
const path = require('path');

// Criar diretório se não existir
const dir = path.join(__dirname, 'public', 'images', 'legislative');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Função para baixar imagem
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(dir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ ${filename} baixada com sucesso!`);
        resolve(filePath);
      });
      
      file.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Remover arquivo parcial
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// URLs das imagens
const images = [
  {
    url: 'https://images.unsplash.com/photo-1555848962-6e79363ec5da?w=800&h=400&fit=crop&q=80',
    filename: 'camara-congresso.jpg'
  },
  {
    url: 'https://www12.senado.leg.br/noticias/materias/2025/07/14/senado-vota-ampliacao-do-garantia-safra-para-22-municipios-do-rj/20200205_04054mo.jpg/mural/imagem_materia',
    filename: 'senado-plenario.jpg'
  }
];

// Baixar todas as imagens
async function downloadAll() {
  console.log('Iniciando download das imagens...');
  
  try {
    for (const image of images) {
      await downloadImage(image.url, image.filename);
    }
    console.log('🎉 Todas as imagens foram baixadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao baixar imagens:', error);
  }
}

downloadAll();
