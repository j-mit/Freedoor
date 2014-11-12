#!/bin/bash
#
# Shell script to wrap around start of server
#
#

#global variables
PROJECT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}/")" && cd .. && pwd )"
SERVER_PATH="."
PYTHON_PATH=""
CONFIG_FILE="freedoor.conf"

#Sanity check for running server
isRunning=`ps -ef|grep server.py|grep -v grep|awk '{print $2}'|wc -l|awk '{print $1}'`
if [ ${isRunning} -eq 1 ]
then
	echo "The server is already running."
	exit 1
else
	echo "Starting the server"
	python ${PROJECT_PATH}/server.py ${SERVER_PATH} ${PROJECT_PATH}/config/${CONFIG_FILE}
fi

