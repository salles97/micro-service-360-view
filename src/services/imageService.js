const pool = require('../db');
const { calculateAngle } = require('../utils/calculateAngle');

exports.processImages = async (imageNames, testadaId) => {
    // 1. Buscar as coordenadas UTM das imagens pelo nome
    const imageQuery = `
        SELECT nome_imagem, ST_X(geom_utm) AS x, ST_Y(geom_utm) AS y
        FROM public.imagens_geolocalizadas
        WHERE nome_imagem = ANY($1::text[])
    `;
    
    const imageResult = await pool.query(imageQuery, [imageNames]);
    
    if (imageResult.rows.length === 0) {
        throw new Error(`Nenhuma imagem encontrada.`);
    }

    // 2. Buscar o centroid da testada
    const testadaQuery = `
        SELECT ST_X(ST_Centroid(geom)) AS x_centroid, ST_Y(ST_Centroid(geom)) AS y_centroid
        FROM dado_novo.testada
        WHERE id = $1
    `;

    const testadaResult = await pool.query(testadaQuery, [testadaId]);

    if (testadaResult.rows.length === 0) {
        throw new Error(`Testada ${testadaId} não encontrada.`);
    }

    const { x_centroid, y_centroid } = testadaResult.rows[0];

    // 3. Calcular o ângulo de cada imagem em relação ao centroid da testada
    const imagesWithAngle = imageResult.rows.map((image) => {
        const { x, y, nome_imagem } = image;

        // Calcular o ângulo usando a função utilitária
        const angle = calculateAngle(
            { x: parseFloat(x), y: parseFloat(y) },
            { x: parseFloat(x_centroid), y: parseFloat(y_centroid) }
        );

        return {
            nome_imagem,
            angle,
            coordinates: { x, y }
        };
    });

    return imagesWithAngle;
};
