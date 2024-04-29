
// Función para formatear respuesta del modelo
export const formatModelResponse = (responseModel) => {
    const fullResponse = responseModel.data
        .split('\n')
        .filter(chunk => chunk)
        .map(chunk => {
            try {
                return JSON.parse(chunk).response;
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return ''; // Devuelve un string vacío en caso de error
            }
        })
        .join('');

    return fullResponse;
}


