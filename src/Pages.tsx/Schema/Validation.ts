import * as yup from "yup";
interface Validation {
  email: string;
  password: string;
  confirmpassword: string;
  name: string;
}
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const validation = yup.object<Validation>({
  email: yup.string().email().required("please enter email"),
  password: yup.string().min(6).required("please enter password"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password")])
    .required("Passwords must match"),
  name: yup.string().min(2),
  Phone: yup
    .string()
    .min(9)
    .required("A phone number is required")
    .matches(phoneRegExp, "invalid phone no"),
  gender: yup.string().required("Required"),
});
