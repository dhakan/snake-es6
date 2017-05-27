#!/usr/bin/env bash
npm run build
sed -ie 's/SERVER_HOST:"http:\/\/localhost:3000"/SERVER_HOST:"http:\/\/sthlmgames-snake.herokuapp.com"/' public/js/app.js
surge --domain http://sthlmgames-snake.surge.sh --project public