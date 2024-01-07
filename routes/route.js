import express from "express";
import { jokeModel } from "../models/jokeModel.js";

const router = express.Router();

router.get('/', async (request, response) => {
    try {

        const count = await jokeModel.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomJoke = await jokeModel.findOne().skip(randomIndex);

        return response.status(200).json({
            data: randomJoke.text,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Save a new Joke
router.post('/', async (request, response) => {
    try {
        if (!request.body.text) {
            return response.status(400).send({
                message: 'Send all the required fields',
            });
        }
        const newJoke = {
            text: request.body.text
        };
        const joke = await jokeModel.create(newJoke);
        return response.status(201).send(joke);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.post('/bulk', async (request, response) => {
    try {
        const data = request.body
        const joke = await jokeModel.insertMany(data);
        return response.status(201).send(joke);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
export default router;