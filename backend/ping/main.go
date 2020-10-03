package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

const port = "8080"

func ping(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]bool{"ready": true})
}

func main() {
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/", ping).Methods("GET")

	log.Fatal(http.ListenAndServe(":"+port, router))
}
