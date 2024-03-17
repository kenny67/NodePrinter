FROM node:18-buster-slim

RUN apt-get -y update&&apt-get -y upgrade\
    && apt-get install -y inetutils-ping curl vim \
    
RUN npm install -g npm@10.2.1 
RUN npm install -g ts-node 
RUN npm install typescript --save \
    && npm install express --save  \


# types@express  error

WORKDIR /app

ENV NODE_ENV production
ENV PORT 5000

EXPOSE 5000

#COPY package*.json ./
#RUN npm install

#CMD npm run dev