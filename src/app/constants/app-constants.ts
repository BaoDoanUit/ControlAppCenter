export const MAX_HISTORY_COUNT = 20;
export const MAX_ID_REDUCE = 100;
export const MAX_LENGTH_OVERFLOW = 40;

export const APP_MESSAGE = {
  LOGIN: {
    LOGIN_FAIL: 'Your email or password incorrect! Please check again!'
  },
  VALIDATE: {
    REQUIRED: 'This field is required!',
    MAX_LENGTH: (max: number) => `Maximum length is ${max} characters!`,
    RANGE_VALUE: (min: number, max: number) =>
      `Input value must be in range from ${min} to ${max}!`,
    COMPARE_WITH: (operatorValueDisplay: string, targetControlValue: any) =>
      `Input value must be ${operatorValueDisplay} ${targetControlValue}!`,
    EMAIL_FORMAT: 'Wrong email format!',
    MATCH_FIELD: (matchFieldName: string, targetFieldName: string) =>
      `${matchFieldName} value do not match with ${targetFieldName} value`,
    REENTER: 'shop name does not exit please enter shop code again',
  }
};
