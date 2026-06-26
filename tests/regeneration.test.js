const { generateItinerary } = require('../src/travel');

describe('User Story 3 - Régénération d’itinéraire avec persistance', () => {

    const initialPayload = {
        city: "Rome",
        departureDate: "2026-07-01",
        returnDate: "2026-07-10",
        price: 800
    };

    test('TC-ITIN-001: La fonction de régénération est disponible et réutilise les mêmes filtres', () => {
        const firstResponse = generateItinerary(initialPayload);

        const regenerationPayload = {
            ...initialPayload,
            excludeId: firstResponse.data.id
        };

        const secondResponse = generateItinerary(regenerationPayload);

        expect(firstResponse.status).toBe(200);
        expect(secondResponse.status).toBe(200);

        expect(regenerationPayload.city).toBe(initialPayload.city);
        expect(regenerationPayload.departureDate).toBe(initialPayload.departureDate);
        expect(regenerationPayload.returnDate).toBe(initialPayload.returnDate);
        expect(regenerationPayload.price).toBe(initialPayload.price);
        expect(secondResponse.data.city).toBe(initialPayload.city);
        expect(secondResponse.data.price).toBe(initialPayload.price);

        expect(secondResponse.data.id).not.toBe(firstResponse.data.id);
        expect(secondResponse.data.activities).not.toEqual(firstResponse.data.activities);
    });
});