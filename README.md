# MAISHacks2020
MAIS Hacks with Yu Tong Liu, Benny Huang, Thierry Jean, and Ji Xi Yang

# Description
- Details of the project can be found [here](./pitch.md)
- Devpost can be found [here](https://devpost.com/software/maishacks2020)
- Winner of the Best Use of Microsoft Cognitive Services API prize

# Usage
Simplest way to have the project working is by bringing up the containers.
- First, checkout the README of the [sentiment analysis api](./backend/sentiment_analysis_api/README.md) and of the
[anomaly detection api](./backend/anomaly_detection_api/README.md) to see which external files you need.
- Run `docker-compose up` in the project root directory (same level as the `docker-compose.yaml` file)
- The application will be reachable at `localhost:8000` after all the images and containers have been built

# Datasets
The data used in this project come from
- [StudentLife](https://studentlife.cs.dartmouth.edu/)
- [Kaggle Dataset](https://www.kaggle.com/cosmos98/twitter-and-reddit-sentimental-analysis-dataset)

# Contributors
- [Ji Xi Yang](https://github.com/jx3yang)
- [Thierry Jean](https://github.com/zilto)
- [Benny Huang](https://github.com/JBennyHuang)
- [Yu Tong Liu](https://github.com/yutongliuytl)
