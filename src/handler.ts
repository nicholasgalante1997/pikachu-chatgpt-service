import { Response, Request } from 'express';
import { MetricConfig, MetricAsync } from '@nickgdev/porygon-metlib/lib/node-exports';
import { DeckBuilder } from './services';
import { CreateChatCompletionResponse } from 'openai';

const metConfig = {
    endpoint: 'http://localhost:7100',
    functionName: 'DeckBuilder.buildDeck()',
    serviceName: 'pikachu-ai-service-name',
    axiosOverrides: {
        headers: {
            'x-api-service-id': 'pikachu'
        }
    }
} as MetricConfig;

const metricFn = new MetricAsync<CreateChatCompletionResponse>(metConfig);

export async function handler(req: Request, res: Response) {
    const { pokemon, set } = req.body;

    if (!pokemon || !set) {
        console.error('Missing targets `pokemon` & `set` from req.body');
        res.status(500).json({ exception: "INVALID_BODY_ON_REQ" });
        return;
    }

    try {
        const { choices } = await metricFn.monitor( // monitors availability
            async () => await metricFn.time( // times fn execution
                async () => await DeckBuilder.buildDeck(pokemon, set) // fn we want to track
            )
        );
        
        if (choices.length < 1) {
            console.error('Invalid response from OpenAI.');
            console.error("Choices: " + JSON.stringify(choices));
            res.status(500).json({ exception: "INVALID_OPAI_RESPONSE" });
            return;
        }

        const choice = choices.at(0);

        res.status(201).json({ openAiGeneratedDeck: choice?.message?.content });
        return;
    
    } catch(e) {
        
        console.log('***************** open ai error *******************');
        console.log(e);
        console.log('***************** open ai error end *******************');
        const error = e as Error;
        console.log(error.message);
        res.status(500).json({ exception: "OPEN_AI_NETWORK_ERROR" });
        return;

    }
}