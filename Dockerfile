# ---------- Dev (webpack-dev-server) ----------
FROM node:20-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
EXPOSE 3000
# Вынес host/port в команду compose, но можно и так:
CMD ["npm","run","start","--","--host","0.0.0.0","--port","3000"]

# ---------- Build (production bundle) ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ---------- Runtime (nginx serves static) ----------
FROM nginx:stable-alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/ ./
COPY nginx/nginx.prod.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
