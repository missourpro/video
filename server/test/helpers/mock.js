function getMock(mockedClass) {
  Object.getOwnPropertyNames(mockedClass.prototype).forEach(m => spyOn(mockedClass.prototype, m));

  return new mockedClass();
};
