FROM node:12.18.3-alpine

LABEL description="Frontend React App"

COPY . /app
WORKDIR /app
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 8000

CMD ["npm", "start"]
