
##Please refer to this

https://developers.facebook.com/docs/marketing-api/reference/ad-campaign

###To run the app , here are the steps
1. To create a new route just hit this command
    * npm run component testcomponent
3. Restart the server and the route is good to go
    * PLEASE DONT DELETE THE COMMENTED LINE IN server.js. this line //auto_add_routes_here_please_dont_delete
4. in production mode if you are using process manager like pm2 or forever, do the following
    * In forever
        - forever start server.js staging
        or
        - forever start server.js production
    * In pm2
        - pm2 start npm -- start server.js  staging
        or
        - pm2 start npm -- start server.js  production
5. when installing node packages, please use `npm install <package-name> --save-dev` on installing front-end dependencies otherwise
    use normal installation for server dependencies `npm install <package-name>`