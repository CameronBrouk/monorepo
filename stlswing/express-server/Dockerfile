# FROM: install the image of the Node.js version.
FROM node:16

ENV PORT=4000
ENV POSTGRES_PORT=5432
ENV DATABASE_URL="postgresql://postgres:password@localhost:5432/monorepo-dev?schema=public&connection_limit=2"
ENV DOMAIN="localhost:4000/"
ENV NODE_ENV="docker"


# WORKDIR: path of the working directory.
WORKDIR /app

# COPY: copy package.json file to the container, then the second one copies all the files inside the project directory.
COPY package.json .

# RUN: execute a command-line inside the container: npm install to install the dependencies in package.json.
RUN npm install

EXPOSE $PORT
EXPOSE $POSTGRES_PORT

COPY . .
# CMD: run script npm start after the image is built.
CMD npm run build && npm run start
