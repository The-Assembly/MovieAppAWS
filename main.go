package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/aws/aws-lambda-go/lambda"
)

var (
	apikey       = "921303bd9d6beed719ae88231d2534db"
	ErrorBackend = errors.New("Something went wrong")
)

type Request struct {
	ID int `json:"id"`
}

type MovieDBResponse struct {
	Movies []Movie `json:"results"`
}

type Movie struct {
	Title       string `json:"title"`
	Description string `json:"overview"`
	Cover       string `json:"poster_path"`
	ReleaseDate string `json:"release_data"`
}

func Handler(request Request) ([]Movie, error) {
	url := fmt.Sprintf("https://api.themoviedb.org/3/discover/movie?api_key=%s", apikey)
}

func main() {

}
