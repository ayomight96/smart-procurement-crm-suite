FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system packages
RUN apt-get update && apt-get install -y gcc && apt-get clean

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything
COPY . .

# Run FastAPI on startup
CMD ["uvicorn", "api.app:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]