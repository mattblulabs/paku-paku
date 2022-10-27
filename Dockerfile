FROM node:alpine3.16
COPY . /opt/app
WORKDIR /opt/app
EXPOSE 8086
RUN ["npm", "i"]
RUN ["npm", "run", "build"]
CMD ["node", "--experimental-fetch", "build/"]