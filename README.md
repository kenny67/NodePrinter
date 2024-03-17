## https://zenn.dev/gakin/scraps/4cc16e7761d1ef   


From Node:12-alpine3.12
FROM node:18-buster-slim  Debian
FROM node:18-buster       ubuntu

# 启动docker容器
# コンテナ起動
docker-compose up -d --build

# 进入docker容器
# コンテナ内に入る
docker-compose exec node-dev sh
docker-compose exec node-dev bash
---------------------
# 启动docker容器
# コンテナ内で必要パッケージを追加

npm init -y
npm install typescript ts-node ts-node-dev


$ npm install -D typescript ts-node @types/node
$ npm install -D @types/express

# 生成tsconfig.json文件
# tsconfig.jsonファイルを作成
npx tsc --init
---------------------
# yarnの初期化(必要に応じて入力する)
$ yarn init

# 加入package各种依赖包， 初始化typescript
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





    