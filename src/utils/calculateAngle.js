const calculateAngle = (pontoImagem, pontoTestada) => {
    const { x: x1, y: y1 } = pontoImagem;
    const { x: x2, y: y2 } = pontoTestada;

    // Calcular o vetor direcional
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Calcular o ângulo em radianos
    const angleRadians = Math.atan2(deltaY, deltaX);
    
    // console.log(angleRadians)
    // Converter para graus
    let angleDegrees = (angleRadians * 180) / Math.PI;
    // console.log(angleDegrees)
    // Ajustar o ângulo para ficar entre 0 e 360 graus
    if (angleDegrees < 0) {
        angleDegrees += 360;
    }

    return angleDegrees;
};

module.exports = { calculateAngle };
