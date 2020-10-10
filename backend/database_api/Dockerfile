FROM golang:alpine

LABEL description="Database API"
COPY . /app

WORKDIR /app

EXPOSE 3500
RUN go build .
CMD ["./database_api"]
