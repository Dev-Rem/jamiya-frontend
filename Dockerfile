# pull official base image
FROM node:14.15.3-alpine

# set working directory
WORKDIR /usr/src/jamiya-frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/jamiya-frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 

# add app
COPY . ./

EXPOSE 3000
# start app
CMD ["npm", "start"]