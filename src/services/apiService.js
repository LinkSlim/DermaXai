export const analyzeLesion = async (imageFile, clinicalData) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  if (clinicalData) {
    formData.append('age', clinicalData.age);
    formData.append('sex', clinicalData.sex);
    formData.append('localization', clinicalData.location);
  }

  try {
    const response = await fetch('/api/predict', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Error en el servidor: ${response.status}`);
    }

    const data = await response.json();

    // Mapear los campos de la respuesta según el nuevo esquema PredictionResponse
    let riskLevel = 'low';
    const typeStr = (data.prediction || '').toLowerCase();
    if (typeStr.includes('melanoma') || typeStr.includes('carcinoma')) {
      riskLevel = 'high';
    } else if (data.prediction_score < 0.7) {
      riskLevel = 'medium';
    }

    return {
      prediction: data.prediction || 'Lesión detectada',
      prediction_score: data.prediction_score !== undefined ? data.prediction_score : 0,
      scores: data.scores || {},
      riskLevel: riskLevel,
      gradcam: data.gradcam_image_base64,
      lime: data.lime_image_base64,
      shap: data.shap_image_base64,
      shap_min: data.shap_min,
      shap_max: data.shap_max,
    };
  } catch (error) {
    console.error('Error al analizar la lesión:', error);
    throw error;
  }
};
