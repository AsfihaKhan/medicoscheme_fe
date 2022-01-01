export const requiredField = [(v) => !!v || "Field is required"];
export const validateEmail = [(v) => /.+@.+\..+/.test(v) || "E-mail must be valid"];
export const validatePhoneNumber = [(v) => !!v || "Field is required", (v) => /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(v) || "Invalid number"];
export const validateNumericValue = [(v) => !!v || "Field is required", (v) => /^\d*\.?\d*$/.test(v) || "Provide valid number"];
export const validateSelectObject = [(v) => Boolean(Object.keys(v || {})[0]) || "Field is required"];
