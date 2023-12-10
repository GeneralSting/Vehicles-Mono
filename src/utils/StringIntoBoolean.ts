const StringIntoBoolean = (stringValue: string) => {
  return JSON.parse(stringValue.toLowerCase());
};

export default StringIntoBoolean;
