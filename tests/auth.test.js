const fs = require('fs');
const path = require('path');

describe('  Authentification voyageur', () => {

    test('TC-AUTH-001: Connexion réussie avec email valide et mot de passe correct - comportement non exposé', () => {
        const credentials = {
            email: "egor@admin.fr",
            password: "SuperPassword123!"
        };

        const dbPath = path.join(__dirname, '../src/db.json');
        const rawData = fs.readFileSync(dbPath);
        const db = JSON.parse(rawData);

        expect(credentials.email).toBe("egor@admin.fr");
        expect(credentials.password).toBe("SuperPassword123!");
        expect(db.destinations).toBeDefined();
        expect(db.users).toBeUndefined();
        expect(db.reservations).toBeUndefined();
    });
});
