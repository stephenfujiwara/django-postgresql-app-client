import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("*Required"),
  password: yup.string().required("*Required"),
});

export const registerSchema = yup.object().shape({
  email: yup.string().required("*Required"),
  username: yup.string().required("*Required"),
  password: yup.string().required("*Required"),
});
