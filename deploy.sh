#!/bin/bash
echo 'Building code to deploy'
cd backend
yarn
pm2 startOrRestart ../process.json --env production
exit