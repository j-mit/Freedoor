"""
	Main server file for project freedoor

"""

import os
import sys
from bottle import run
# shoudl immport controllers here
# should make use of config or env
# TODO: make server run forever
# TODO: global logging


# Main Function
def main():
	if len(sys.argv) > 2:
		base = sys.argv[1]

		# paste makes bottle multi-threaded instaed of single
		run(host='127.0.0.1', port=8080, server='paste')
	else:
		print "usage:", sys.argv[0],"[base_dir] [conf file]"

if __name__ == '__main__':
	main()