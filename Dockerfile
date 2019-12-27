FROM node:8.17.0-alpine3.9

ARG PORT 80
ENV PORT $PORT
EXPOSE $PORT

ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json
RUN npm install /app

RUN npm run build /app

COPY ./src/ /app

CMD ["node", "/app"]



