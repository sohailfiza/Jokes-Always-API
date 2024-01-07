import mongoose from "mongoose";

const jokeSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const jokeModel = mongoose.model('jokeModel', jokeSchema, 'jokesCollection')