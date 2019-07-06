# FileServer

* A Web based file sharing module

* Setup
	* Install Node from [here](https://nodejs.org/en/download/) if not pre-installed
	* Keep FileServer in your machine where you wish and have some free space.
	* From FileServer folder run "npm install"
	* Run "npm start" or "node fileServer.js" from same commandline.
	* Done with setup, can open your_ip_address:5110 from any machine on same network.

* Improvements Expected
	* Progress Bar while Uploading
	* Folder Upload
	* Nice GUI
	* Filter files such as documents, images, softwares and more.
	* Explicit Delete Access to the Uploader or admin hosting the server.
	* portable, that on one click complete setup is done, even node setup automation. 

* Production
	* In Windows Environment, go in prod\windows folder
		* Open Command Prompt and run runOnStartUp.bat
		* Or, Open command prompt in administrator mode, and run createFileService (but not working)
		* Or, Run runfs.bat from command line