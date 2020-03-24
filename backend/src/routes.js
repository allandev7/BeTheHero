const express = require('express');
const OngController = require('./controller/OngController')
const IncidentsController = require('./controller/IncidentsController')
const ProfileController = require('./controller/ProfileController')
const routes = express.Router();


const connection = require('./database/connection');

routes.post('/login', async (request, response) => {
    const {id } = request.body;
    
    const ong = await connection('ongs').where('id', id).select('name').first();

    if(!ong){
        return response.status(400).json({error: 'No Ong foud with this is'});
    }

    return response.json(ong)
})

routes.post('/ongs', OngController.insert)
routes.get('/ongs', OngController.list)

routes.post('/incidents', IncidentsController.insert)
routes.get('/incidents', IncidentsController.list)
routes.delete('/incidents/:id', IncidentsController.delete)

routes.get('/profile', ProfileController.list)




module.exports = routes;