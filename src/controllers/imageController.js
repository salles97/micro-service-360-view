const imageService = require('../services/imageService');
const path = require('path');
const { setInitialOrientation } = require('../services/editImageMetadata');

exports.getImagesWithAngle = async (req, res) => {
    const { imageNames, testadaId } = req.body;

    try {
        const imagesWithAngle = await imageService.processImages(imageNames, testadaId);

        // Editar o metadado de cada imagem
        for (const image of imagesWithAngle) {
            // Construir o caminho completo da imagem na pasta 'imagens'
            const imagePath = path.join('./images/', image.nome_imagem);
         
            await setInitialOrientation(imagePath, image.angle);
        }

        res.json({ success: true, data: imagesWithAngle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
