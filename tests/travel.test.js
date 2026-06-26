const { generateItinerary } = require('../src/travel');

describe('User Story 1 & 2 - Gestion des Itinéraires et Budget', () => {

    test('TC-VOYAGE-001: Rejet avec un budget à 0', () => {
        const payload = {
            destination: "Tokyo",
            departureDate: "2026-07-01",
            returnDate: "2026-07-15",
            budget: 0
        };

        expect(() => generateItinerary(payload)).toThrow("Le budget doit être supérieur à zéro.");
    });

    test('Rejet si la destination est manquante', () => {
        const payload = {
            departureDate: "2026-07-01",
            returnDate: "2026-07-15",
            budget: 1000
        };

        expect(() => generateItinerary(payload)).toThrow("La destination est obligatoire.");
    });

    test('Rejet si la date de retour est avant le départ', () => {
        const payload = {
            destination: "Tokyo",
            departureDate: "2026-07-15",
            returnDate: "2026-07-01",
            budget: 1000
        };

        expect(() => generateItinerary(payload)).toThrow("La date de retour doit être après la date de départ.");
    });

    test('TC-VOYAGE-002: Génération nominale de l’itinéraire', () => {
        const payload = {
            destination: "Montréal",
            departureDate: "2026-07-01",
            returnDate: "2026-07-15",
            budget: 1500,
            preferences: ["Nature", "Gastronomie"]
        };

        const response = generateItinerary(payload);

        expect(response.status).toBe(200);
        expect(response.data.city).toBe("Montréal");
        
        response.data.activities.forEach(activite => {
            const estUnFiltreValide = activite === "Nature" || activite === "Gastronomie";
            expect(estUnFiltreValide).toBe(true);
        });
    });
});