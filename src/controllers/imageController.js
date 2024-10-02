const imageService = require('../services/imageService');

exports.getImagesWithAngle = async (req, res) => {
    const { imageNames, testadaId } = req.body;

    try {
        // Consultar as imagens e calcular o ângulo para cada uma
        const imagesWithAngle = await imageService.processImages(imageNames, testadaId);

        res.json({ success: true, data: imagesWithAngle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};
