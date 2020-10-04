import pandas as pd
from sklearn.preprocessing import MinMaxScaler


def compute_features(df):
    """
    Computes features from original data sampling

    features:
       ['conversation', 'bt_level_avg', 'bt_level_std',
       'bt_total_devices_around', 'bt_total_far', 'bt_total_farther',
       'bt_total_near', 'bt_total_nearer', 'wifi_level_avg', 'wifi_level_std',
       'wifi_total_devices_around', 'wifi_total_far', 'wifi_total_near',
       'wifi_total_nearer', 'phone_in_dark', 'phone_charging', 'phone_locked',
       'activity_inference_0', 'activity_inference_1', 'activity_inference_2',
       'activity_inference_3', 'audio_inference_0', 'audio_inference_1',
       'audio_inference_2', 'audio_inference_3', hours, days]
    """

    df.drop(['bt_level_avg', 'bt_level_std', 'bt_total_far', 'bt_total_farther',
       'bt_total_near', 'bt_total_nearer', 'wifi_level_avg', 'wifi_level_std',
       'wifi_total_far', 'wifi_total_near',
       'wifi_total_nearer'], axis=1)

    df["main_activity"] = df[["activity_inference_0", "activity_inference_1",
                              "activity_inference_2", "activity_inference_3"]].idxmax(axis="columns") # activity with the highest inferred probability
    df["main_audio"] = df[["audio_inference_0", "audio_inference_1", 
                           "audio_inference_2"]].idxmax(axis="columns") # audio with the highest inferred probability

    scaler = MinMaxScaler((-1, 1))
    df["now_in_dark"] = scaler.fit_transform(df[["phone_in_dark"]].where(df == 600, other=0).diff()) #{-1: "now dark", 1: "no longer dark"}
    df["now_charging"] = scaler.fit_transform(df[["phone_charging"]].where(df == 600, other=0).diff()) #{-1: "now charging", 1: "no longer charging"}
    df["now_locked"] = scaler.fit_transform(df[["phone_locked"]].where(df == 600, other=0).diff()) #{-1: "now locked", 1: "now unlocked"}
    return df


def agg_seasons(df, freq="hour"):
    """
    Aggregates dataframe according to passed frequency

    freq:
        translates to pandas freq argument with dictionary
    features:
       ['conversation', 'bt_level_avg', 'bt_level_std', 'bt_total_devices_around',
       'wifi_level_avg', 'wifi_level_std', 'wifi_total_devices_around',
       'phone_in_dark', 'phone_charging', 'phone_locked',
       'activity_inference_0', 'activity_inference_1', 'activity_inference_2',
       'activity_inference_3', 'audio_inference_0', 'audio_inference_1',
       'audio_inference_2', 'audio_inference_3', hours, days]
    """

    dict = {"hour": "H",
            "day" : "D",
            "3-periods" : "8H", #from 4:00 to 12:00; 12:00 to 20:00; 20:00 to 4:00
            "week": "W"}
    freq = dict[freq]
    
    # aggregating functions will skip NaN;
    # in that case, mean is more representative than sum to deal with missing data
    group_df = df.groupby(pd.Grouper(freq=freq, base=-4, label="right")) # base=-4 starts period at 4:00 am
    agg_df = group_df.agg({"conversation" : "mean", 
                           "bt_total_devices_around" : "mean",
                           "wifi_total_devices_around" : "mean",
                           "phone_in_dark" : "mean", 
                           "phone_charging" : "mean", 
                           "phone_locked" : "mean",
                           "activity_inference_0" : "mean", 
                           "activity_inference_1" : "mean", 
                           "activity_inference_2" : "mean", 
                           "activity_inference_3" : "mean", 
                           "audio_inference_0" : "mean", 
                           "audio_inference_1" : "mean", 
                           "audio_inference_2" : "mean", 
                           "audio_inference_3" : "mean", 
                           })

    count_x = lambda x: x[x == 1].count()
    agg_df["count_now_dark"] = group_df["now_in_dark"].apply(count_x)
    agg_df["count_now_charging"] = group_df["now_charging"].apply(count_x)
    agg_df["count_locked"] = group_df["now_locked"].apply(count_x)
    return agg_df


def main():
    # requires user input to select file to process
    userid = input(">Enter id: u")
    df = pd.read_csv("../model_training/data/u" + userid + "_sensing_data.csv")
    #converts to datetime object
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    #set inplace "timestamp" column as index
    df.set_index("timestamp", inplace=True)
    computed_df = compute_features(df)
    aggregated_df = agg_seasons(computed_df)
    aggregated_df.to_csv("../model_training/data/u" + userid + "_features.csv")

if __name__ == "__main__":
    main()