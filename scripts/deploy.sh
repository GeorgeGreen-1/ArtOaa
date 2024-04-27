#!/bin/bash

# Pull the latest changes from the GitHub repository
git pull origin main  # Replace 'main' with the name of your branch

# Build your application (if necessary)
# npm install  # Example command for a Node.js application
# npm run build  # Example command to build the application

# Copy the updated files to your DigitalOcean droplet using SCP (Secure Copy)
scp -r C:\Users\vusal\OneDrive\Desktop\Artoa root@209.38.132.164:/root/ArtOaa

# Restart your application or server
ssh user@droplet_ip "sudo systemctl restart artoa.io"  # Replace 'your_application' with the name of your application or server service
