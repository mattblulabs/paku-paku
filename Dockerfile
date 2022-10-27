FROM node:alpine3.16
COPY . /opt/app
WORKDIR /opt/app
ARG port=8086
EXPOSE $port
RUN ["npm", "i"]
RUN ["npm", "run", "build"]
CMD ["node", "--experimental-fetch", "build/"]