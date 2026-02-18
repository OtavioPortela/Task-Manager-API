# ══════════════════════════════════════════
# Stage 1: Builder — compila o TypeScript
# ══════════════════════════════════════════
FROM node:20-alpine AS builder
 
WORKDIR /app
 
# copia manifests e instala TODAS as deps (incluindo devDeps)
COPY package*.json ./
RUN npm ci
 
# copia o restante e compila
COPY . .
RUN npm run build
 
# ══════════════════════════════════════════
# Stage 2: Runner — imagem de produção leve
# ══════════════════════════════════════════
FROM node:20-alpine AS runner
 
WORKDIR /app
 
# apenas deps de produção
COPY package*.json ./
RUN npm ci --only=production
 
# copia apenas o código compilado do stage anterior
COPY --from=builder /app/dist ./dist
 
# usuário não-root por segurança
USER node
 
EXPOSE 3000
 
CMD ["node", "dist/main.js"]