#!/bin/bash
set -a
BACKEND_REPO=git@github.com:gropupr/backend.git
FRONTEND_REPO=git@github.com:gropupr/frontend.git

# Function to add entries to hosts file
add_hosts_entries() {
  echo "=====> Configuring /etc/hosts entries"
  
  # Detect OS and set hosts file path
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    HOSTS_FILE="/etc/hosts"
    USE_SUDO=true
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    HOSTS_FILE="/etc/hosts"
    USE_SUDO=true
  elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    # Windows (Git Bash or Cygwin)
    HOSTS_FILE="/c/Windows/System32/drivers/etc/hosts"
    USE_SUDO=false
  else
    echo "=====> Warning: Unknown OS type. Attempting to use /etc/hosts"
    HOSTS_FILE="/etc/hosts"
    USE_SUDO=true
  fi

  # Entries to add
  HOSTS_ENTRIES=(
    "127.0.0.1 api.groupr.local"
    "127.0.0.1 admin.groupr.local"
    "127.0.0.1 dev.groupr.local"
    "127.0.0.1 cdn.groupr.local"
  )

  # Check if hosts file exists
  if [ ! -f "$HOSTS_FILE" ]; then
    echo "=====> Warning: Hosts file not found at $HOSTS_FILE"
    return 1
  fi

  # Check which entries need to be added
  ENTRIES_TO_ADD=()
  for entry in "${HOSTS_ENTRIES[@]}"; do
    if ! grep -q "$entry" "$HOSTS_FILE" 2>/dev/null; then
      ENTRIES_TO_ADD+=("$entry")
    fi
  done

  # Add missing entries
  if [ ${#ENTRIES_TO_ADD[@]} -eq 0 ]; then
    echo "=====> All hosts entries already exist, skipping"
  else
    echo "=====> Adding ${#ENTRIES_TO_ADD[@]} new hosts entries"
    
    # Prepare entries to add
    NEW_ENTRIES="# Groupr local development entries"$'\n'
    for entry in "${ENTRIES_TO_ADD[@]}"; do
      NEW_ENTRIES+="$entry"$'\n'
    done
    
    if [ "$USE_SUDO" = true ]; then
      # macOS/Linux: use sudo
      echo "$NEW_ENTRIES" | sudo tee -a "$HOSTS_FILE" > /dev/null
      if [ $? -eq 0 ]; then
        echo "=====> Successfully added hosts entries (sudo required)"
      else
        echo "=====> Error: Failed to add hosts entries. You may need to run with sudo."
        return 1
      fi
    else
      # Windows: try without sudo
      echo "$NEW_ENTRIES" >> "$HOSTS_FILE"
      if [ $? -eq 0 ]; then
        echo "=====> Successfully added hosts entries"
      else
        echo "=====> Error: Failed to add hosts entries. You may need administrator privileges."
        return 1
      fi
    fi
  fi
}

if [ -d "backend" ]; then
  echo "=====> rails backend already exists skipping clone"
else
  echo "=====> Cloning $BACKEND_REPO"
  git clone $BACKEND_REPO backend
fi

if [ -d "frontend" ]; then
  echo "=====> frontend already exists skipping clone"
else
  echo "=====> Cloning $FRONTEND_REPO"
  git clone $FRONTEND_REPO frontend
fi

# Kill any running containers
echo "=====> Stopping and removing any running containers"
docker compose down

# Build all services first
echo "=====> Building all services"
docker compose build --no-cache

# Start DB service for setup
echo "=====> Starting DB Service"
docker compose up -d db

# Wait for DB to be ready
echo "=====> Waiting for database to be ready"
sleep 5

# Setup Backend Databases
echo "=====> Setting up Backend Databases"
echo "=====> Creating Backend Databases"
docker compose run --rm --no-deps backend rails db:create 
echo "=====> Migrating Backend Databases"
docker compose run --rm --no-deps backend rails db:migrate 
echo "=====> Seeding Backend Databases"
docker compose run --rm --no-deps backend rails db:seed 

# Setup Frontend Dependencies
echo "=====> Setting up Frontend Dependencies"
docker compose run --rm --no-deps frontend npm install

echo "=====> Stopping and removing any running containers"
docker compose down

# Start all services
echo "=====> Starting all services"
docker compose up -d

# Configure hosts entries
echo "=====> Configuring /etc/hosts entries"
add_hosts_entries