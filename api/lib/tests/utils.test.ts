import { generateRandomString } from "utils/string.utils"

describe('string.utils.ts', () => {
    test('should generate random string of length 10', () => {
        const l = 10;
        
        const s1 = generateRandomString(l);

        expect(s1.length).toBe(10);
    })

    test('should generate two different strings of length 10', () => {
        const l = 10;
        
        const s1 = generateRandomString(l);
        const s2 = generateRandomString(l);

        expect(s1.length).toBe(10);
        expect(s2.length).toBe(10);
        expect(s1).not.toBe(s2);
    })

    test('should return null', () => {
        const l = 0;
        
        const s1 = generateRandomString(l);

        expect(s1).toBeNull();
    })

    test('should return null', () => {
        const l = -5;
        
        const s1 = generateRandomString(l);

        expect(s1).toBeNull();
    })
})