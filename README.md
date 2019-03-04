# Log Analyzer
==================

## Technologies used:
HTML/CSS
Node.js
JQuery
Python
## Installation Instructions
Install 'npm,nodejs' to the correct version using the code below.
Clone the repository.
```
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs

git clone https://github.com/yasharthb/Nutanix.git
cd Nutanix
```


## Launching 
### Start the Simulator 
```
cd public/data
python log_simulator.zip -n N -p P --new --sleep_time 1
```
### Start the App

Type ``` npm init ``` and Press RETURN through all the prompts
Launch using ```node app.js```
Open localhost at port ```5050```
## Using the App
Click ```How to Use``` for the video or Click get started.
Click on the Side Nav Bar.
### Log search
Type in any Keyword you want to search.
For multiple Keywords enter all separated by semicolons as shown in the PreSearch Text.
### Time Stamp Search
Enter the time fields in standard Time Object format as in ```YYYY-MM-DD HH:MM:SS.ssssss```
Please ensure a proper search for results.
Any filtered logs are Downloadable as pdf files for further review using the download button in this window.
### Live Logs
If the log files are being dumped properly.
Press Start button to view the tailing central log.

### Note : If a service fails to work.Please restart the server