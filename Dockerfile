FROM node:18-buster-slim

RUN apt-get -y update \
    &&apt-get install -y inetutils-ping dnsutils curl vim
    
#RUN npm install npm@10.2.1 
RUN npm cache clean --force

RUN npm install npm -g 

RUN npm install ts-node -g
RUN npm install typescript express -g
#    && npm install express --save\


# types@express  error

WORKDIR /app

ENV NODE_ENV production
ENV PORT 6000

EXPOSE 6000

#COPY package*.json ./
#RUN npm install

#CMD npm run dev
