FROM node:18-alpine

WORKDIR /app

ENV DATABASE=mongodb://root:d3v1n3ng1n33r@localhost:27017/socialNetwork?authSource=admin&replicaSet=rs0
ENV PORT=80
ENV NODE_ENV=production
ENV JWT_SECRET=this-is-my-secret-jwt-secret-very-long
ENV JWT_EXPIRES_IN=1h
ENV JWT_COOKIE_EXPIRES_IN=1
ENV FRONTEND_URL=https://binhct.internship.designveloper.com
ENV BACKEND_URL=https://binhct.api.internship.designveloper.com

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]