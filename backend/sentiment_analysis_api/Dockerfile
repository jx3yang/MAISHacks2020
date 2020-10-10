FROM python:3.7

LABEL description="Sentiment analysis API"
LABEL maintainer="Ji Xi Yang <jx3yang@uwaterloo.ca>"

COPY . /app

WORKDIR /app

RUN pip3 install -r requirements.txt
EXPOSE 5002
ENTRYPOINT [ "python3" ]
CMD [ "app.py" ]
