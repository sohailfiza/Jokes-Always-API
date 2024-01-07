import mongoose from "mongoose";

const erJokeSchema = new mongoose.Schema(
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

export const erJokeModel = mongoose.model('erJokeModel', erJokeSchema, 'erJokesCollection')