export const updateObject = (oldObject, updateProperties) => {
  return {
    ...oldObject,
    ...updateProperties
  }
}

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }
  let errorMessage = "";
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
    errorMessage = "Please enter a valid";
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    errorMessage = `Please enter a min length ${rules.minLength}`;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    errorMessage = `Please enter a max length ${rules.maxLength}`;
  }

  if ( rules.isEmail ) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test( value ) && isValid
    errorMessage = `Please enter a not email`;
}

if ( rules.isNumeric ) {
    const pattern = /^\d+$/;
    isValid = pattern.test( value ) && isValid
    errorMessage = `Please enter a not number`;
}

  return [isValid, errorMessage];
}