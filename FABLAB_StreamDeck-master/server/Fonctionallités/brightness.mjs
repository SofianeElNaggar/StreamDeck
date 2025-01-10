import brightness from 'brightness';
import batteryLevel from 'battery-level';

batteryLevel().then(level => {
}).catch(error => {
  console.error('Erreur lors de la récupération du niveau de la batterie :', error);
});

// Fonction pour ajuster la luminosité
const adjustBrightness = async (delta) => {
  try {
    let currentBrightness = await brightness.get();
    currentBrightness = Math.max(0, Math.min(1, currentBrightness + delta));
    await brightness.set(currentBrightness);
    //console.log(`Luminosité ajustée à : ${Math.round(currentBrightness * 100)}%`);
  } catch (error) {
    console.error('Erreur lors de l\'ajustement de la luminosité :', error);
  }
};

export function brightnessUp() {
  adjustBrightness(0.1);
}
export function brightnessDown() {
  adjustBrightness(-0.1);
}
