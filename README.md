Commands
go get github.com/aws/aws-lambda-go/lambda # for handler registration
	go get github.com/stretchr/testify # for unit tests


set GOOS=linux
set GOARCH=amd64
go build -o main main.go# MovieAppAWS


go.exe get -u github.com/aws/aws-lambda-go/cmd/build-lambda-zip