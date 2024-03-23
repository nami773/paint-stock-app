FROM python:3.12

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY requirements.txt /app/backend/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /app/backend/
