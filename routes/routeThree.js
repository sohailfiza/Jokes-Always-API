import express from "express";
import { erJokeModel } from "../models/engineerJokeModel.js";

const routerThree = express.Router();

routerThree.get('/', async (request, response) => {
    try {

        const count = await erJokeModel.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomJoke = await erJokeModel.findOne().skip(randomIndex);

        return response.status(200).json({
            data: randomJoke.text,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Save a new Joke
routerThree.post('/', async (request, response) => {
    try {
        if (!request.body.text) {
            return response.status(400).send({
                message: 'Send all the required fields',
            });
        }
        const newJoke = {
            text: request.body.text
        };
        const joke = await erJokeModel.create(newJoke);
        return response.status(201).send(joke);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

routerThree.post('/bulk', async (request, response) => {
    try {
        const data = request.body
        const joke = await erJokeModel.insertMany(data);
        return response.status(201).send(joke);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
export default routerThree;