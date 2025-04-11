import * as yup from "yup";
interface Validation {
  email: string;
  password: string;
  confirmpassword: string;
  // name: string;
}
export const loginvalidation = yup.object<Validation>({
  email: yup.string().email().required("please enter email"),
  password: yup.string().min(6).required("please enter password"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password")])
    .required("Passwords must match"),
  // name: yup.string().min(2),
});