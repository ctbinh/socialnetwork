FROM node:18-alpine AS builder

WORKDIR /app

ENV REACT_APP_URL_SERVER=https://binhct.api.internship.designveloper.com
ENV REACT_APP_URL_CLIENT=https://binhct.internship.designveloper.com
ENV PORT=80

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

FROM nginx:1.21.0-alpine as production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]