const crypto = require('crypto');
const connection = require('../database/connection');
module.exports = {
    async list (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async insert (request, response) {

        const { name, email, whatsapp, cidade, uf } = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            cidade,
            uf
        });
    
        return response.json({ id });
    }

    
}