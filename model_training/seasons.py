import pandas as pd

def format_df(df):
    #converts to datetime object
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    #set inplace "timestamp" column as index
    df.set_index("timestamp", inplace=True)
    #extract hour from timestamp index
    df["hours"] = df.index.hour
    #extract day from timestamp index
    df["days"] = df.index.map(lambda x: x.strftime("%b-%d"))
    return df

def agg_seasons(df, freq, feature):
    dict = {"hour": "H",
            "day" : "D",
            "3-period" : "8H",
            "week": "W"}
    freq = dict[freq]

    df = format_df(df)
    feature = df[[feature, "hours", "days"]]
    grouped = feature.groupby(pd.Grouper(freq=freq, base=0, label="right"))
    return grouped
