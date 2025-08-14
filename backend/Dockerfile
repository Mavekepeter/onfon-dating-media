FROM python:3.11-slim

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose Flask port
EXPOSE 5000

# Run Flask in production mode with gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:create_app()"]
