# Usar imagem oficial do Node
FROM node:18

# Criar diretório da aplicação
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do projeto
COPY . .

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]
