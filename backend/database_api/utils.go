package main

type Metric struct {
	Name      string
	Timestamp string
	Value     float32
}

type Form struct {
	Name       string
	Timestamp  string
	Message    string
	Sentiment  string
	Sleephours int
	Rating     int
}
