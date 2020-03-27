
const connection = require('../database/connection');


module.exports = {
    async login (request, response)  {
        const {id } = request.body;
        
        const ong = await connection('ongs').where('id', id).select('name').first();
    
        if(!ong){
            return response.status(400).json({error: 'No Ong foud with this is'});
        }
    
        return response.json(ong)
    }
}