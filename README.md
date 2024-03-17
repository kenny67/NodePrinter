## https://zenn.dev/gakin/scraps/4cc16e7761d1ef   


From Node:12-alpine3.12
FROM node:18-buster-slim  Debian
FROM node:18-buster       ubuntu

# コンテナ起動
docker-compose up -d --build
# コンテナ内に入る
docker-compose exec node-dev sh
docker-compose exec node-dev bash
---------------------
# コンテナ内で必要パッケージを追加

npm init -y
npm install typescript ts-node ts-node-dev


$ npm install -D typescript ts-node @types/node
$ npm install -D @types/express

# tsconfig.jsonファイルを作成
npx tsc --init
---------------------
# yarnの初期化(必要に応じて入力する)
$ yarn init

# パケージの導入
$ yarn add express
$ yarn add --dev @types/express @types/node typescript ts-node-dev
# コンテナ内
# TypeScriptの初期化
$ yarn run tsc --init
---------------------


Makefile 

up:
    docker-compose up -d

up-prod:
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

down: 
    docker-compose down





    