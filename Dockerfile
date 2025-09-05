# --- Stage 1: Define our base environment ---
# We start with an official, clean version of Python.
FROM python:3.11-slim

# --- Stage 2: Set up the environment inside the container ---
# This sets the main working folder inside the container to /app.
WORKDIR /app

# --- Stage 3: Copy our code into the container ---
# First, we copy only the requirements file. This is a clever optimization.
COPY requirements.txt .

# --- Stage 4: Install the dependencies ---
# Now, we install all the Python packages from our "shopping list".
# Docker will cache this step, so it only re-runs if requirements.txt changes.
RUN pip install --no-cache-dir -r requirements.txt

# --- Stage 5: Copy the rest of our application code ---
# Now that the dependencies are installed, we copy our entire backend folder.
COPY . .

# --- Stage 6: Define the command to run the application ---
# This is the final command that tells the container how to start our Gunicorn server.
# It also runs our database migrations first.
CMD ["sh", "-c", "python manage.py migrate && gunicorn ngo_project.wsgi --bind 0.0.0.0:$PORT"]

