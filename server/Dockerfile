FROM node:18-alpine

WORKDIR /app

ENV DATABASE=mongodb+srv://ctbinh:Binh171201@cluster0.b6wiu.mongodb.net/?retryWrites=true&w=majority
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