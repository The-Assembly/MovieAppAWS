# MovieAppAWS

CREATE GO DEPLOYMENT PACKAGE FOR UPLOAD TO AWS LAMBDA

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

CREATE AWS LAMBDA FUNCTION

1. Sign in to your free AWS account and navigate to the Lambda dashboard at https://console.aws.amazon.com/lambda/home

2. Click 'Create function' and select 'Author from scratch'

3. Enter your function name, select 'Go 1.x' as your runtime

4. Under Role, select an existing role with the correct permissions for Lambda if you have one. Else select 'Create new role from template(s)'. If you do the latter, you'll have to give a role name and select a policy template (you can use 'Basic Edge Lambda permissions' from the drop down)

5. Once your function has been successfully created and you are redirected to its configuration page, scroll down to 'Function code' and upload our deployment package (main.zip) under 'Function package'. Under handler, type 'main' and click 'Save'

6. After 'Save' completes, click 'Test'. This will bring up a dialog where you can create a new test event with the 'Hello world' template. After saving your test, click 'Test' again. If your function works properly, it should say 'Execution result: succeeded' and give you the result in the Details console with your movies listed in JSON format (as returned by TMDB).

CREATE AWS API GATEWAY TO USE LAMBDA FUNCTION

1. Navigate to the API Gateway console in AWS https://console.aws.amazon.com/apigateway/home

2. Click 'Create API' and select 'New API', adding an API NAme.

3. From the API page you are redirected to, under the 'Resources' option select 'Create Method' from the 'Actions' dropdown. Select 'ANY' from the dropdown that appears under '/'

4. In the Setup pane, select Integration type as 'Lambda function' and in the 'Lambda Function' entry, start typing the name of the function you created in the previous section (It will appear in autocomplete).  Click OK to confirm.

5. In 'Actions' dropdown, select 'Enable CORS' and click 'Enable CORS and replace existing CORS headers' in the pane. Click 'Yes, replace existing values'.

6. Once completed, select 'Deploy API' from 'Actions'. Under 'Deployment Stage' in the dialog, select an existing stage you've created or '[New Stage]' if you don't have one. Enter a 'Stage Name' and click Deploy.

7. Copy the link that comes up next to 'Invoke URL' and paste it into the address bar of your web browser.  You should now see the JSON results in your browser.

