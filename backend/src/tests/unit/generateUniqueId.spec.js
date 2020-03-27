const generateUniqueId = require('../../utils/generateUniqueId');

describe('GenerateUniqueId', () => {
    it('shoul generate an unique id', () => {
        const id = generateUniqueId();
        expect(id).toHaveLength(8);
    })
})