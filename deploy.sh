#!/bin/bash
# Soul Lab Gym — Deploy to VPS
# Usage: ./deploy.sh
# Set VPS_IP in your environment or replace below

VPS_IP="${VPS_IP:-YOUR_VPS_IP}"
VPS_USER="${VPS_USER:-root}"
DEPLOY_PATH="/var/www/soullabgym"

echo "Building..."
npm run build

echo "Deploying to $VPS_USER@$VPS_IP:$DEPLOY_PATH"
rsync -avz --delete dist/ $VPS_USER@$VPS_IP:$DEPLOY_PATH/

echo "Done. Visit http://$VPS_IP to verify."
