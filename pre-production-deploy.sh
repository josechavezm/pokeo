#!/bin/bash
echo 'Building code to deploy'
git checkout master
cd frontend
yarn
yarn run build
git add .
cd ..
git commit -am "Automatic build for pm2 deploy."
git push origin master
# Terminate our shell script with success message
exit