FROM python:3.7

LABEL description="Feature points cache"
LABEL maintainer="Ji Xi Yang <jx3yang@uwaterloo.ca>"

COPY . /app

WORKDIR /app

RUN pip3 install -r requirements.txt
EXPOSE 5003
ENTRYPOINT [ "python3" ]
CMD [ "app.py" ]
