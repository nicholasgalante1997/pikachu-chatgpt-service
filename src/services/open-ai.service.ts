import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config();

class OpenAIError extends Error {
    constructor(){
        super("Unable to connect OpenAi Client to model due to corrupted/incorrect admin configuration.");
    }
}

interface IOpenAIClient {
    openAiInstance: OpenAIApi;
}

class OpenAIClient implements IOpenAIClient {
    private config: Configuration;
    public openAiInstance: OpenAIApi;
    constructor(){
        const envOrganization = process.env.OPEN_AI_ORGANIZATION;
        const envApiKey = process.env.OPEN_AI_API_KEY;

        if (!envApiKey || !envOrganization) {
            throw new OpenAIError();
        }
        this.config = new Configuration({
            organization: envOrganization,
            apiKey: envApiKey
        });
        this.openAiInstance = new OpenAIApi(this.config);
    }
};

export const openAiClient = new OpenAIClient();