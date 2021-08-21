package main

import (
	"net/http"
	"github.com/gorilla/mux"
	"log"
)

func main() {
	r := mux.NewRouter()
	fs := http.FileServer(http.Dir("."))
	r.PathPrefix("/").Handler(fs)
	log.Fatal(http.ListenAndServe(":8080", r))
}