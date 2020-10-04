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

### Usage
GET: 
    
    - `:3500/api/get_metric/{type}/{name}`

    in: 
        URI localhost:3500/api/get_metric/activity/jixi

    out: 
        [
            {"Name":"jixi","Timestamp":"2020/10/03","Value":10},
            {"Name":"jixi","Timestamp":"2020/10/07","Value":30},
            {"Name":"jixi","Timestamp":"2020/10/06","Value":60},
            {"Name":"jixi","Timestamp":"2020/10/05","Value":20},
            {"Name":"jixi","Timestamp":"2020/10/04","Value":80}
        ]

    - `:3500/api/get_form/{name}

    in: 
        URI localhost:3500/api/get_form/jixi

    out: 
        (WIP)

POST: 
    
    - `:3500/api/add_metric/{type}`

    in: 
        URI localhost:3500/api/add_metric/activity/

        BODY
        [
            {"Name":"jixi","Timestamp":"2020/10/03","Value":10},
            {"Name":"jixi","Timestamp":"2020/10/07","Value":30},
            {"Name":"jixi","Timestamp":"2020/10/06","Value":60},
            {"Name":"jixi","Timestamp":"2020/10/05","Value":20},
            {"Name":"jixi","Timestamp":"2020/10/04","Value":80}
        ]

    out: 
        null

    - `:3500/api/add_form`

    in: 
        URI localhost:3500/api/add_form

        BODY
        (WIP)

    out: 
        null