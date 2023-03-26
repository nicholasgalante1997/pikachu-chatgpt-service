import { Response, Request } from 'express';
import { DeckBuilder } from './services';

export async function handler(req: Request, res: Response) {
    const { pokemon, set } = req.body;

    if (!pokemon || !set) {
        console.error('Missing targets `pokemon` & `set` from req.body');
        res.status(500).json({ exception: "INVALID_BODY_ON_REQ" });
        return;
    }

    const { choices } = await DeckBuilder.buildDeck(pokemon, set);

    if (choices.length < 1) {
        console.error('Invalid response from OpenAI.');
        console.error("Choices: " + JSON.stringify(choices));
        res.status(500).json({ exception: "INVALID_OPAI_RESPONSE" });
        return;
    }

    res.status(201).json({ openAiGeneratedDeck: choices[0].message?.content });
}