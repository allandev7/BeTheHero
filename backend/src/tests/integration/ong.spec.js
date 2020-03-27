const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection')

describe('ONG', () => {

    beforeEach(async ()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async ()=>{
        await connection.destroy();
    });

    it('should to be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "AACD",
            email: "allansilvapereira10@gmail.com",
            whatsapp: "+5511949895947",
            cidade: "São Paulo",
            uf: "SP"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })

});