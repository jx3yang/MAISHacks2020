# Backend
Directory where we will put all the backend services

# Database API
Default port of this API is on 3500
1. Create a Firebase account and go to your console
2. Click on the gear next to **Project Overview**
3. Go to **Service accounts** tab
4. Select **Go** and click on **Generete new private key**
5. Place it in *database_api/.sa/*
6. execute `go get firebase.google.com/go` in *database_api/*