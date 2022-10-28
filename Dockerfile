FROM node:alpine3.16
COPY . /opt/app
WORKDIR /opt/app
ARG PORT=8086
EXPOSE $PORT
RUN ["npm", "i"]
RUN ["npm", "run", "build"]
CMD ["node", "--experimental-fetch", "build/"]