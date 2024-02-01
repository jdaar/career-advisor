FROM node:alpine AS build

WORKDIR /app
COPY ./package.json /app

RUN npm install

COPY . /app

RUN npm run build

FROM node:alpine AS production

WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/package.json /app

ENTRYPOINT [ "node", "build" ]

