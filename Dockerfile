FROM node:19.0.0-buster-slim

RUN mkdir -p /app/services/pikachu

WORKDIR /app/services/pikachu

COPY ./package.json .

RUN npm install

COPY ./tsconfig.json .

COPY ./configuration/ ./configuration/

COPY ./src/ ./src/

COPY ./.env ./.env

RUN npm run build

RUN rm -rf \
    node_modules \
    src \
    configuration \
    tsconfig.json \ 
    package-lock.json

RUN npm install --only=production

ENV PORT=4001

EXPOSE 4001

CMD ["npm", "run", "start"]