package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func handleData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Add("Content-Type", "application/json")

	if r.URL.Path != "/data" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}

	// Open our jsonFile
	jsonFile, err := os.Open("./catdata.json")
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened catdata.json")

	byteValue, _ := ioutil.ReadAll(jsonFile)

	result := make(map[string]interface{})

	json.Unmarshal([]byte(byteValue), &result)

	jsonized, err := json.MarshalIndent(result, "", "   ")
	if err != nil {
		log.Fatal(err)

	}

	w.Write([]byte(jsonized))
}

func main() {
	http.HandleFunc("/data", handleData)

	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}

}
