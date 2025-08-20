# Use Python 3.12.2 slim image
FROM python:3.12.2-slim

# Prevent Python from creating .pyc files and enable unbuffered stdout
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install cryptography gunicorn

# Copy app files
COPY . .

# Expose port
EXPOSE 5001

# Run the app with Gunicorn
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5001", "--workers", "2"]
