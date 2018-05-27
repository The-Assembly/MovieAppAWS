# MovieAppAWS

Create Go executable for upload to AWS Lambda

1.	Install Go from https://golang.org/doc/install

2.	Install git client from https://git-scm.com/book/en/v2/Getting-Started-Installing-Git (it is there by default on many machines though, can check with <b>git --version</b> on cmd). This is needed to install dependencies directly from git on Go.

3.	Install dependencies with Go get

		- <b>go get github.com/aws/aws-lambda-go/lambda # for handler registration</b>
	
		- <b>go get github.com/stretchr/testify # for unit tests</b>
	
4.	Create a new project folder (can open it up in VS Code if you'd like to run/debug)

5.	Copy main.go and main_test.go to your project folder (main and main.zip are compiled binaries - not needed if your are rebuilding them on your machine)

6.	From cmd: run unit test coded in main_test.go by typing '<b>go test</b>'. Status returned should be OK.

7.	To create binary, execute the following commands in cmd:

		set GOOS=linux
		set GOARCH=amd64
		go build -o main main.go

 		This should create a Linux executable that can be uploaded (after zipping) to AWS Lambda

8.  Zip the binary into a deployment package:

		zip deployment.zip main

		If you are a Windows user, you need to use the following steps instead, else you might get permission errors on Lambda console:
			
			i. From cmd, run: <b>go get -u github.com/aws/aws-lambda-go/cmd/build-lambda-zip</b>
			
			ii. Use the tool from your GOPATH. If you have a default installation of Go, the tool will be in %USERPROFILE%\Go\bin.
					
					in cmd.exe: <b>%USERPROFILE%\Go\bin\build-lambda-zip.exe -o main.zip main </b>
					
					eg; <i>"c:\Users\The Assembly\go\bin\build-lambda-zip.exe" -o main.zip main</i>
			
			{Source: https://github.com/aws/aws-lambda-go}
