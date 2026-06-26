const fs = require('fs');
const path = require('path');

function generateItinerary(data) {
    const { city, departureDate, returnDate, price, excludeId, preferences } = data;

    if (!city) {
        throw new Error("La destination est obligatoire.");
    }

    const dep = new Date(departureDate);
    const ret = new Date(returnDate);

    if (ret <= dep) {
        throw new Error("La date de retour doit être après la date de départ.");
    }

    if (price <= 0) {
        throw new Error("Le prix doit être supérieur à zéro.");
    }

    const dbPath = path.join(__dirname, 'db.json');
    const rawData = fs.readFileSync(dbPath);
    const db = JSON.parse(rawData);

    const itinerary = db.destinations.find((dest) => {
        const matchCity = dest.city === city;
        const matchPrice = dest.price <= price;
        const matchExclude = dest.id !== excludeId;

        let matchPref = true;
        if (preferences && preferences.length > 0) {
            matchPref = preferences.every(p => dest.activities.includes(p));
        }

        return matchCity && matchPrice && matchExclude && matchPref;
    });

    if (!itinerary) {
        throw new Error("Aucun itinéraire trouvé pour ce prix ou cette destination.");
    }

    return {
        status: 200,
        data: itinerary
    };
}

module.exports = { generateItinerary };