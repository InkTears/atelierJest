const fs = require('fs');
const path = require('path');

function generateItinerary(data) {
    const { destination, departureDate, returnDate, budget } = data;

    if (!destination) {
        throw new Error("La destination est obligatoire.");
    }

    const dep = new Date(departureDate);
    const ret = new Date(returnDate);

    if (ret <= dep) {
        throw new Error("La date de retour doit être après la date de départ.");
    }

    if (budget <= 0) {
        throw new Error("Le budget doit être supérieur à zéro.");
    }

    const dbPath = path.join(__dirname, 'db.json');
    const rawData = fs.readFileSync(dbPath);
    const db = JSON.parse(rawData);

    const itinerary = db.destinations.find(
        (dest) => dest.city === destination && dest.price <= budget
    );

    if (!itinerary) {
        throw new Error("Aucun itinéraire trouvé pour ce budget ou cette destination.");
    }

    return {
        status: 200,
        data: itinerary
    };
}

module.exports = { generateItinerary };