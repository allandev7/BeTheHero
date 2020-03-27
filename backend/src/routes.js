const express = require('express');
const OngController = require('./controller/OngController')
const IncidentsController = require('./controller/IncidentsController')
const ProfileController = require('./controller/ProfileController')
const SessionController = require('./controller/SessionController')
const routes = express.Router();
const {celebrate, Segments, Joi} = require('celebrate');



routes.post('/login', celebrate({
    [Segments.BODY] : Joi.object().keys({
        id: Joi.string().required()
    })
}),SessionController.login)


routes.post('/ongs', celebrate({
    [Segments.BODY]:Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(14),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.insert)

routes.get('/ongs', OngController.list)

routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(3),
        description: Joi.string().required().min(5),
        value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),IncidentsController.insert)


routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}),  IncidentsController.list)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),IncidentsController.delete)

routes.get('/profile', celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.list)




module.exports = routes;