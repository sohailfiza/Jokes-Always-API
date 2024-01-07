import express from "express";
import { drJokeModel } from "../models/doctorJokeModel.js";

const routerTwo = express.Router();

routerTwo.get('/', async (request, response) => {
    try {

        const count = await drJokeModel.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomJoke = await drJokeModel.findOne().skip(randomIndex);

        return response.status(200).json({
            data: randomJoke,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Save a new Joke
routerTwo.post('/', async (request, response) => {
    try {
        if (!request.body.text) {
            return response.status(400).send({
                message: 'Send all the required fields',
            });
        }
        const newJoke = {
            text: request.body.text
        };
        const joke = await drJokeModel.create(newJoke);
        return response.status(201).send(joke);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

routerTwo.post('/bulk', async (request, response) => {
    try {
        const data = request.body
        const joke = await drJokeModel.insertMany(data);
        return response.status(201).send(joke);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
export default routerTwo;