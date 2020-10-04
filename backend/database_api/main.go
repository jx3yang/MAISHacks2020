package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"context"

	firebase "firebase.google.com/go"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"

	"github.com/gorilla/mux"
)

const port = "3500"

var private_key_file string

type Quote struct {
	Quote  string
	Author string
}

func main() {
	if _, err := os.Stat(".sa"); os.IsNotExist(err) {
		log.Fatalln(".sa directory does not exist")
		os.Exit(-1)
	}

	var files []string

	err := filepath.Walk(".sa/", func(path string, info os.FileInfo, err error) error {
		if !info.IsDir() {
			files = append(files, path)
		}
		return nil
	})
	if err != nil {
		log.Fatalln(err)
	}

	if len(files) < 1 {
		log.Fatalln("no private key found in directory .sa")
		os.Exit(-1)
	}

	private_key_file = files[0]

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/api/get_metric/{type}/{name}", getMetric).Methods("GET")
	router.HandleFunc("/api/set_metric/{type}/", setMetric).Methods("POST")

	log.Fatal(http.ListenAndServe(":"+port, router))
}

func getMetric(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	_type := vars["type"]
	name := vars["name"]

	docs := getFirebaseMetric(_type, name)

	json.NewEncoder(w).Encode(docs)

}

func setMetric(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	_type := vars["type"]

	var metrics []Metric

	if err := json.NewDecoder(r.Body).Decode(&metrics); err != nil {
		log.Fatalln(err)
		return
	}

	setFirebaseMetric(_type, metrics)
}

func getFirebaseMetric(_type string, name string) *[]map[string]interface{} {
	sa := option.WithCredentialsFile(private_key_file)
	app, err := firebase.NewApp(context.Background(), nil, sa)

	client, err := app.Firestore(context.Background())
	defer client.Close()
	if err != nil {
		log.Fatalln(err)
	}

	res := client.Collection(_type).Where("Name", "==", name).Documents(context.Background())

	var docs []map[string]interface{}

	for {
		doc, err := res.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil
		}

		docs = append(docs, doc.Data())
	}

	return &docs
}

func setFirebaseMetric(_type string, metrics []Metric) {
	sa := option.WithCredentialsFile(private_key_file)
	app, err := firebase.NewApp(context.Background(), nil, sa)

	client, err := app.Firestore(context.Background())
	defer client.Close()
	if err != nil {
		log.Fatalln(err)
	}

	for _, metric := range metrics {
		_, _, err := client.Collection(_type).Add(context.Background(), metric)
		if err != nil {
			log.Fatalln(err)
		}
	}
}
