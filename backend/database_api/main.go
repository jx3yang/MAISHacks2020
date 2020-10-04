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

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
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
	router.HandleFunc("/api/add_metric/{type}/", addMetric).Methods("POST")

	router.HandleFunc("/api/get_forms/{name}", getForm).Methods("GET")
	router.HandleFunc("/api/add_forms/", addForm).Methods("POST")

	log.Fatal(http.ListenAndServe(":"+port, router))
}

func getMetric(w http.ResponseWriter, r *http.Request) {

	enableCors(&w)

	vars := mux.Vars(r)
	collection := vars["type"]
	name := vars["name"]

	docs := getFirebaseMetric(collection, name)

	json.NewEncoder(w).Encode(docs)

}

func addMetric(w http.ResponseWriter, r *http.Request) {

	enableCors(&w)

	vars := mux.Vars(r)
	collection := vars["type"]

	var metrics []Metric

	if err := json.NewDecoder(r.Body).Decode(&metrics); err != nil {
		log.Fatalln(err)
		return
	}

	addFirebaseMetric(collection, metrics)
}

func getFirebaseMetric(collection string, name string) *[]map[string]interface{} {
	sa := option.WithCredentialsFile(private_key_file)
	app, err := firebase.NewApp(context.Background(), nil, sa)

	client, err := app.Firestore(context.Background())
	defer client.Close()
	if err != nil {
		log.Fatalln(err)
	}

	res := client.Collection(collection).Where("Name", "==", name).Documents(context.Background())

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

func addFirebaseMetric(collection string, metrics []Metric) {
	sa := option.WithCredentialsFile(private_key_file)
	app, err := firebase.NewApp(context.Background(), nil, sa)

	client, err := app.Firestore(context.Background())
	defer client.Close()
	if err != nil {
		log.Fatalln(err)
	}

	for _, metric := range metrics {
		_, _, err := client.Collection(collection).Add(context.Background(), metric)
		if err != nil {
			log.Fatalln(err)
		}
	}
}

func getForm(w http.ResponseWriter, r *http.Request) {

	enableCors(&w)

	vars := mux.Vars(r)
	name := vars["name"]

	docs := getFirebaseForm(name)

	json.NewEncoder(w).Encode(docs)

}

func addForm(w http.ResponseWriter, r *http.Request) {

	enableCors(&w)

	var forms []Form

	if err := json.NewDecoder(r.Body).Decode(&forms); err != nil {
		log.Fatalln(err)
		return
	}

	addFirebaseForm(forms)

}

func getFirebaseForm(name string) *[]map[string]interface{} {
	sa := option.WithCredentialsFile(private_key_file)
	app, err := firebase.NewApp(context.Background(), nil, sa)

	client, err := app.Firestore(context.Background())
	defer client.Close()
	if err != nil {
		log.Fatalln(err)
	}

	res := client.Collection("Surveys").Where("Name", "==", name).Documents(context.Background())

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

func addFirebaseForm(forms []Form) {
	sa := option.WithCredentialsFile(private_key_file)
	app, err := firebase.NewApp(context.Background(), nil, sa)

	client, err := app.Firestore(context.Background())
	defer client.Close()
	if err != nil {
		log.Fatalln(err)
	}

	for _, form := range forms {
		_, _, err := client.Collection("Surveys").Add(context.Background(), form)
		if err != nil {
			log.Fatalln(err)
		}
	}
}
