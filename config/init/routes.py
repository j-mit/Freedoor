"""
	Routes file for project
"""

from bottle import route
#import controller functions here
# this file acts as servelts in WS

@get('/')
def getRootRoute():
	getRootController();

@get('/login'):
def getLoginRoute():
	getLoginController();

# not sure if this'll work, but shoudl be this way
