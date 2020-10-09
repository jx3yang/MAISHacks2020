FROM python:3

LABEL description="Anomaly Detection"
LABEL maintainer="Ji Xi Yang <jx3yang@uwaterloo.ca>"

COPY . /app

WORKDIR /app

RUN pip3 install -r requirements.txt
EXPOSE 5001
ENTRYPOINT [ "python3" ]
CMD [ "app.py" ]
