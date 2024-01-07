import mongoose from "mongoose";

const drJokeSchema = new mongoose.Schema(
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

export const drJokeModel = mongoose.model('drJokeModel', drJokeSchema, 'drJokesCollection')