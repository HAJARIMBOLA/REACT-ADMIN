import {
 required,
 email,
 minLength
} from "react-admin";

export const validateName = [
 required(),
 minLength(2)
];

export const validateEmail = [
 required(),
 email()
];