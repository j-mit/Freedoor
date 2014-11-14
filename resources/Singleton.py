#
# Class to act as a decorator for making other classes singleton
# Used for logger, configObj
#
#

class Singleton:
	def __init__(self, decorated):
		self._decorated = decorated

	def getInstance(self):
		try:
			return self._instance
		except AttributeError:
			self._instance = self._decorated()
			return self_instance

	def __call__(self):
		raise TypeError("Signletons can be accessed only through getInstance");

	def __instancecheck__(self, instance):
		return isinstance(instance, self._decorated)