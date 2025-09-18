FROM node:18.19
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
RUN yarn global add pm2
COPY . .
ENV PORT 80
RUN ["yarn", "run", "build"]
EXPOSE 80
CMD ["pm2-runtime", "server.js"]
