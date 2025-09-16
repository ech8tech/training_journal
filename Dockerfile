# ---------- Dev (webpack-dev-server) ----------
FROM node:20-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 9000
# Вынес host/port в команду compose, но можно и так:
CMD ["npm","run","start","--","--host","0.0.0.0","--port","9000"]

# ---------- Build (production bundle) ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---------- Runtime (nginx serves static) ----------
FROM nginx:stable-alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/ ./
COPY nginx/nginx.prod.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
