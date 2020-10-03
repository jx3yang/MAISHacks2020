package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"context"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
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

	http.HandleFunc("/api/get_quote/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "POST":

			var body map[string]interface{}
			json.NewDecoder(r.Body).Decode(&body)

			basicGetQuote("sampleData", body["author"].(string))
		}
	})

	http.HandleFunc("/api/set_quote/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "POST":

			var body map[string]interface{}
			json.NewDecoder(r.Body).Decode(&body)

			quote := Quote{
				Quote:  body["quote"].(string),
				Author: body["author"].(string),
			}

			basicSetQuote("sampleData", body["author"].(string), &quote)
		}
	})

	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func basicGetQuote(collection string, document string) {
	sa := option.WithCredentialsFile(private_key_file)
	app, err := firebase.NewApp(context.Background(), nil, sa)

	client, err := app.Firestore(context.Background())
	if err != nil {
		log.Fatalln(err)
	}

	res, err := client.Collection(collection).Doc(document).Get(context.Background())
	if err != nil {
		log.Fatalln(err)
	}

	defer client.Close()

	log.Print(res.Data())
}

func basicSetQuote(collection string, document string, quote *Quote) {
	sa := option.WithCredentialsFile(private_key_file)
	app, err := firebase.NewApp(context.Background(), nil, sa)

	client, err := app.Firestore(context.Background())
	if err != nil {
		log.Fatalln(err)
	}

	res, err := client.Collection(collection).Doc(document).Set(context.Background(), quote)
	if err != nil {
		log.Fatalln(err)
	}

	log.Print(res)

	defer client.Close()
}
