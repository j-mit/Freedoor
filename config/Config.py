#
#	Helper class to help read config and have a singleton instance 
#
#
#

from configobj import ConfigObj 
#
#import Singleton

class Singleton:
	def __init__(self):
		print "Singleton created."

	def getInstance(self):
		try:
			return self._instance
		except AttributeError:
			self._instance = self._decorated(self)
			return self_instance

	def __call__(self):
		raise TypeError("Signletons can be accessed only through getInstance");

	def __instancecheck__(self, instance):
		return isinstance(instance, self._decorated)


@Singleton
class Config:
	def __init__(self, configFile):
		self.configFile = configFile
		print "Config file created. "

	def printConfig():
		print "Config printed:"


if __name__ == '__main__':
	config = Config.getInstance()
	config.printConfig()