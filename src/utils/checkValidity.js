// TODO -- Handle Input Validation --
export const checkValidity = (value, rules) => {
  let isValid = true;

  // TODO - if no validation rules are defined, return true for validity result
  if(!rules) {
    return true;
  }

  // TODO - check if rules has a required rule
  if (rules.required) {
    // TODO - set to true if not empty & isValid, otherwise false if empty
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    // TODO - set to true if length value is greater than or equal to rule min length & isValid, otherwise false if not met
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    // TODO - set to true if length value is less than or equal to rule max length & isValid, otherwise false if not met
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
  }

  return isValid;
}