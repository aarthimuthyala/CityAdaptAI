import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATASET_DIR = os.path.join(BASE_DIR, "datasets")

_city_services_df = None
_areas_df = None


def load_city_services_data():
    global _city_services_df

    if _city_services_df is None:
        df1 = pd.read_csv(os.path.join(DATASET_DIR, "kaggle_transport.csv"))
        df2 = pd.read_csv(os.path.join(DATASET_DIR, "city_services.csv"))
        df3 = pd.read_csv(os.path.join(DATASET_DIR, "twitter_events.csv"))

        _city_services_df = pd.concat(
            [df1, df2, df3],
            ignore_index=True
        )

    return _city_services_df


def load_hyderabad_areas():
    global _areas_df

    if _areas_df is None:
        _areas_df = pd.read_csv(
            os.path.join(DATASET_DIR, "hyderabad_areas.csv")
        )

    return _areas_df
