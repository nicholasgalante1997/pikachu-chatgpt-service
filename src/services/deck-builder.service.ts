import axios from 'axios';
import { openAiClient } from './open-ai.service';
import { DECK_BUILDER_AI_PROMPT } from '../constants';
import { CreateChatCompletionResponse } from 'openai';

class DeckBuilderError extends Error {
    constructor(){
        super("Unable to build deck. Issue connecting with OpenAI api. Check private logs.");
    }
}

export class DeckBuilder {
    static openAiClient = openAiClient.openAiInstance;

    static async buildDeck(targetPokemon: string, targetSet: string) {
        const sanitizedString = DECK_BUILDER_AI_PROMPT.replace("{{target_pokemon}}", targetPokemon).replace("{{target_set}}", targetSet);
        const result = await this.openAiClient.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: sanitizedString }]
        })

        if (result.status < 200 || result.status > 299) {
            throw new DeckBuilderError();
        }

        return result.data as CreateChatCompletionResponse;
    }
}