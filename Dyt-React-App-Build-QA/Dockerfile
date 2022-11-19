#FROM node:12.19.0-alpine3.9
#FROM node:alpine-node:6
FROM node:16

WORKDIR /op/app/

COPY dyt-react-app/ /op/app/

RUN ls && npm cache clean --force && npm install


EXPOSE 3000

CMD [ "npm", "run", "start:test" ]

