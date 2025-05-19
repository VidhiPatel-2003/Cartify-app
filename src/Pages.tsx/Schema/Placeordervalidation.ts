import * as yup from "yup";
interface Placeordervaldiation {
  name: string;
  email: string;
  Phone: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const pincoderegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const placeordervalidation = yup.object<Placeordervaldiation>({
  email: yup.string().email().required("please enter email"),
  name: yup.string().min(2),
  Phone: yup
    .string()
    .min(9)
    .required("A phone number is required")
    .matches(phoneRegExp, "invalid phone no"),
  gender: yup.string().required("Required"),
  address: yup.string().min(5).required("must be mention address"),
  city: yup.string().min(2).required("mustbe mention city"),
  state: yup.string().min(2).required("mustbe mention state"),
  pincode: yup.string().min(2).required("mustbe mention pincode"),
});
