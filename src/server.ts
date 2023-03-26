import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { handler as openAIDeckBuilderHandler } from './handler';
import { trace, validateReq } from './middleware';

const expressApp = express();

expressApp.use(cors());
expressApp.use(express.json());

expressApp.get('/', trace, (req, res) => res.status(200).json({ service_name: 'pikachu-ai-deck-service' }));
expressApp.post('/d/build', trace, validateReq, openAIDeckBuilderHandler);

const server = createServer(expressApp);

export { server };
