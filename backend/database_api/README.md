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
        URI localhost:3500/api/get_metric/conversation/Kevin

    out:
        [
            {
                "Name": "Kevin",
                "Timestamp": "2013-03-28 06:00:00",
                "Value": 0
            },
            {
                "Name": "Kevin",
                "Timestamp": "2013-03-28 05:00:00",
                "Value": 0
            },
            {
                "Name": "Kevin",
                "Timestamp": "2013-03-30 16:00:00",
                "Value": 0
            },
        ]

    - `:3500/api/get_form/{name}

    in:
        URI localhost:3500/api/get_forms/Kevin

    out:
        [
            {
                "Message": "i did great on my midterm",
                "Name": "Kevin",
                "Rating": 3,
                "Sentiment": "positive",
                "Sleephours": 7,
                "Timestamp": "2020-10-04"
            },
            {
                "Message": "i cant believe that my house burned down today...","Name": "Kevin",
                "Rating": 3,
                "Sentiment": "negative",
                "Sleephours": 7,
                "Timestamp": "2020-10-04"
            },
        ]

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
        URI localhost:3500/api/add_forms/

        BODY
        [
            {"Name":"jixi","Timestamp":"2020/10/03","Message":"some message","Sentiment":"negative","Sleephours":8,"Rating":5},
            {"Name":"jixi","Timestamp":"2020/10/07","Message":"some message","Sentiment":"positive","Sleephours":3,"Rating":2},
            {"Name":"jixi","Timestamp":"2020/10/06","Message":"some message","Sentiment":"positive","Sleephours":2,"Rating":1},
            {"Name":"jixi","Timestamp":"2020/10/05","Message":"some message","Sentiment":"negative","Sleephours":5,"Rating":3},
            {"Name":"jixi","Timestamp":"2020/10/04","Message":"some message","Sentiment":"neutral","Sleephours":6,"Rating":5}
        ]

    out:
        null
