FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install cryptography gunicorn

COPY . .

EXPOSE 5001

# ✅ Run Gunicorn against app.py's "app" instance
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5001", "--workers", "2"]
