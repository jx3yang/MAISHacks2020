# RoutineSmart
Routine smart is a digital health platform empowering you to monitor and gain awareness of your personal routine.


## Description
From the moment you wake up, to the first email you read, you probably follow a routine you can easily identify. Now, could you describe what happens between that email and your late-night snack? Obviously, our behaviors are not randomly organized; we all have routines, or overarching structures to organize what we set to accomplish on a given day.

RoutineSmart enables you to dive deep into your routine by leveraging the sensing capabilities of your mobile phone. Powered by Microsoft Azure Cognitive Services, our web plaform analyzes these metrics using state-of-the-art AI technology to identify significant shift from your routine. From seemingly unimportant metrics such as "when was my phone unlocked", rich information can be inferred about sleep disruption, distractions, or device usage time for example.


## Platform features
The platform packs many useful features for users, caregivers, health professionals, or therapists;
- Leverage our mobile phone sensing capabilities to automatically detect anomaly in your routine;
- Inspect visualizations and observe trends in your daily behaviors;
- Use the diary to leave traces of your thoughts, your achievements, your worries, or your to-do list;
- Sentiment analysis of diary entries;
- Complete quick clinically-inspired questionnaires to track your health;
- Choose to have automated notifications for yourself.


## Our project
### Motivation
The growing field of research in "reality mining" establishes significant links between routine itself (structured behaviors) and mental health. The disorganization of behaviors as been shown to be associated with lower mood and higher stress in normal populations and predictive of manic-depressive phases shift in bipolar disorder or psychosis in shizophrenia. Advancements in machine-learning and AI are central to the research in this domain and the creation of digital health tools promoting autonomy in health management. Additionally, creating functional, useful, ethical, and open source applications is desirable for users enables better data collection to further improve digital health solutions.

### Basis
- Started from the open source StudentLife dataset, which contains data collected from undergrad students over 10 weeks;
- They used mobile phones to collect data both actively and passively (e.g., surveying the user on mood vs. timestamping when the phone is locked);
- Some passive data is inferred through classifiers within the application or device (e.g., is the user walking or stationary);

### Conceptualization
- Considered open sensing frameworks for mobile phone application to be available (Funf, Beweit);
- Considered privacy concerns to be solvable by running algorithms locally and only sending results to database (e.g., sentiment analysis of diary);
- Decided to limit our proof-of-concept to a set of features, which could expanded upon with more time and resources.

### Components
User interface:
- Dashboard with visualizations of routine behaviors;
- Automatic highlighting of anomalous data points;
- Diary tab for the user to write notes or thoughts;
- Form for clinically-inspired health-related surveys;
- UI developed with Ant Design Pro and React.

Data preprocessing:
- Sentiment analysis of diary entries;
- Engineer features from phone sensors raw metrics;
- Compute and aggregate metrics over time period;
- Data is cleaned and preprocessed with _Python Pandas_;
- Extensive feature engineering to extract relevant predictors to routine anomalies.

Database:
- Freely stores preprocessed user data in Google Firebase;
- API microservice written in _Go_ to connect RoutineSmart and Firebase.

Calls to Azure Cognitive Services API:
- Integration of Azure's anomaly detection API;
- API microservice written in _Python Flask_ to connect RoutineSmart and Azure.

Outcomes of detected anomaly:
- Highlighting of detected anomaly on user dashboard.

## Future Directions
The plaform would benefit from these additional features or considerations to fulfill its purpose:
- Improve interpretability of features for end users;
- Reduce model to clinically or practically relevant features;
- Add forecasting capabilities;
- Add notifications for caregivers, health professionals, or therapists when user show routine shifts;
- Add appropriate health resources and services for user.