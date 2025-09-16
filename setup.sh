#!/bin/bash
set -a
BACKEND_REPO=git@github.com:gropupr/backend.git
FRONTEND_REPO=git@github.com:gropupr/frontend.git

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
echo "=====> Building DB Service"
docker-compose build --no-cache db
echo "=====> Starting DB Service"
docker-compose up -d db
echo "=====> Building Backend Service"
docker-compose build --no-cache backend
echo "=====> Seting up Backend Databases"
echo "=====> Creating Backend Databases"
docker-compose run --rm --no-deps backend rails db:create 
echo "=====> Migrating Backend Databases"
docker-compose run --rm --no-deps backend rails db:migrate 
echo "=====> Seeding Backend Databases"
docker-compose run --rm --no-deps backend rails db:seed 
echo "=====> Building Frontend Service"
docker-compose build --no-cache frontend
echo "=====> Seting up Frontend Dependencies"
docker-compose run --rm --no-deps frontend npm install
echo "=====> Starting Backend Service"
docker-compose up -d backend
echo "=====> Starting Frontend Service"
docker-compose up -d frontend