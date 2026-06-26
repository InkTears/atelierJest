const { generateItinerary } = require('../src/travel');

describe('User Story 1 & 2 - Gestion des Itinéraires et prix', () => {

    test('TC-VOYAGE-001: Rejet avec un prix à 0', () => {
        const payload = {
            city: "Tokyo",
            departureDate: "2026-07-01",
            returnDate: "2026-07-15",
            price: 0
        };

        expect(() => generateItinerary(payload)).toThrow("Le prix doit être supérieur à zéro.");
    });

    test('Rejet si la destination est manquante', () => {
        const payload = {
            departureDate: "2026-07-01",
            returnDate: "2026-07-15",
            price: 1000
        };

        expect(() => generateItinerary(payload)).toThrow("La destination est obligatoire.");
    });

    test('Rejet si la date de retour est avant le départ', () => {
        const payload = {
            city: "Tokyo",
            departureDate: "2026-07-15",
            returnDate: "2026-07-01",
            price: 1000
        };

        expect(() => generateItinerary(payload)).toThrow("La date de retour doit être après la date de départ.");
    });

    test('Rejet si aucun itinéraire ne correspond en DB', () => {
        const payload = {
            city: "Tokyo",
            departureDate: "2026-07-01",
            returnDate: "2026-07-15",
            price: 10
        };

        expect(() => generateItinerary(payload)).toThrow("Aucun itinéraire trouvé pour ce prix ou cette destination.");
    });

    test('TC-VOYAGE-002: Génération nominale de l’itinéraire avec préférences', () => {
        const payload = {
            city: "Montréal",
            departureDate: "2026-07-01",
            returnDate: "2026-07-15",
            price: 1500,
            preferences: ["Nature"]
        };

        const response = generateItinerary(payload);

        expect(response.status).toBe(200);
        expect(response.data.city).toBe("Montréal");
        expect(response.data.activities).toContain("Nature");
    });
});