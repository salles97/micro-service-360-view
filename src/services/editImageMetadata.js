// src/services/editImageMetadata.js
const { ExifTool } = require('exiftool-vendored');
const exiftool = new ExifTool();

/**
 * Função para editar o metadado da imagem 360°.
 * @param {string} imagePath - Caminho da imagem 360°.
 * @param {number} yaw - Ângulo calculado para definir a direção inicial.
 */
async function setInitialOrientation(imagePath, yaw) {
    try {
        // Imprimir metadados antes da atualização
        const originalMetadata = await exiftool.read(imagePath);
        console.log('Metadados originais:', originalMetadata);

        // Atualizar o campo correto de orientação (Yaw)
        await exiftool.write(imagePath, {
            Yaw: yaw, // Altera o ângulo da câmera
            GPSImgDirection: yaw // Pode ser importante para players que usam dados de GPS
        });
        console.log(`Metadado da imagem ${imagePath} atualizado com Yaw: ${yaw}`);

        // Imprimir metadados após a atualização
        const updatedMetadata = await exiftool.read(imagePath);
        console.log('Metadados atualizados:', updatedMetadata);
    } catch (error) {
        console.error('Erro ao editar metadado:', error);
    }
}

module.exports = { setInitialOrientation };
