# MovieAppAWS

Create Go executable for upload to AWS Lambda

1.	Install Go from https://golang.org/doc/install

2.	Install git client from https://git-scm.com/book/en/v2/Getting-Started-Installing-Git (it is there by default on many machines though, can check with 
<b>git --version</b> 
    on cmd). This is needed to install dependencies directly from git on Go.

3.	Install dependencies with Go get from cmd
      
        go get github.com/aws/aws-lambda-go/lambda # for handler registration
        go get github.com/stretchr/testify # for unit tests
	
4.	Create a new project folder (can open it up in VS Code if you'd like to edit/run/debug)

5.	Copy main.go and main_test.go to your project folder (main and main.zip are compiled binaries - not needed if you are rebuilding them on your machine)

6.	From cmd: run unit test coded in main_test.go by typing '
<b>go test</b>
'. Status returned should be OK.  
  
    If you'd like to debug in VS Code, install this via Go Get: https://github.com/derekparker/delve and create a debug congifuration from VS Code.

7.	To create binary, execute the following commands in cmd:
  
        set GOOS=linux

        set GOARCH=amd64

        go build -o main main.go
    
    This should create a Linux executable that can be uploaded (after zipping) to AWS Lambda

8.  Zip the binary into a deployment package from cmd:

	    zip deployment.zip main
	    
    If you are using windows, you need to use the following steps instead, else you might get permission errors on Lambda console:
    
        i. From cmd, run: 
            go get -u github.com/aws/aws-lambda-go/cmd/build-lambda-zip

        ii. Use the tool from your GOPATH. If you have a default installation of Go, the tool will be in %USERPROFILE%\Go\bin.

            From cmd: %USERPROFILE%\Go\bin\build-lambda-zip.exe -o main.zip main 

              eg; "c:\Users\The Assembly\go\bin\build-lambda-zip.exe" -o main.zip main

        {Source: https://github.com/aws/aws-lambda-go}
