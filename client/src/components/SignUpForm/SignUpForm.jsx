import { useFormik } from "formik";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, FormFeedback, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { DataContext } from "../../store/GlobalState";
import { postData } from "../../utils/fetchData";

const passwordRegExp =
  // eslint-disable-next-line
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignUpForm = () => {
  const { dispatch } = useContext(DataContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_no: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Please provide a valid email")
        .required("Email is required"),
      phone_no: Yup.string()
        .required("Phone Number is required")
        .matches(phoneRegExp, "Phone number is not valid"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          passwordRegExp,
          "Password must have at least one alphabet letter, one number, and one special character"
        ),
      confirm_password: Yup.string()
        .required("Confirm Password is required")
        .matches(
          // eslint-disable-next-line
          passwordRegExp,
          "Password must have at least one alphabet letter, one number, and one special character"
        )
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      const res = await postData("auth/signup", values);
      if (res.err) {
        return res.err.map(({ msg }) => toast.error(msg));
      }

      localStorage.setItem("OLX_TOKEN", res.token);

      dispatch({
        type: "AUTH",
        payload: {
          token: res.token,
          user: res.user,
        },
      });
      return toast.success(res.msg);
    },
  });

  return (
    <div
      style={{
        textAlign: "start",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div className="mb-3">
            <Label>Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter Your Name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              invalid={!!(formik.touched.name && formik.errors.name)}
              required
            />
            {formik.touched.name && formik.errors.name ? (
              <FormFeedback>{formik.errors.name}</FormFeedback>
            ) : null}
          </div>
          <div className="mb-3">
            <Label>Email ID</Label>
            <Input
              autoComplete="off"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email ID"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              invalid={!!(formik.touched.email && formik.errors.email)}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <FormFeedback>{formik.errors.email}</FormFeedback>
            ) : null}
          </div>
          <div className="mb-3">
            <Label>Phone No.</Label>
            <Input
              autoComplete="off"
              type="tel"
              id="phone_no"
              name="phone_no"
              placeholder="Enter Your Phone No."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone_no}
              invalid={!!(formik.touched.phone_no && formik.errors.phone_no)}
              required
            />
            {formik.touched.phone_no && formik.errors.phone_no ? (
              <FormFeedback>{formik.errors.phone_no}</FormFeedback>
            ) : null}
          </div>
          <div className="mb-3">
            <Label>Password</Label>
            <Input
              autoComplete="off"
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              invalid={!!(formik.touched.password && formik.errors.password)}
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <FormFeedback>{formik.errors.password}</FormFeedback>
            ) : null}
          </div>
          <div className="mb-3">
            <Label>Confirm Password</Label>
            <Input
              autoComplete="off"
              type="password"
              id="confirm_password"
              name="confirm_password"
              placeholder="Enter Your Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
              invalid={
                !!(
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                )
              }
              required
            />
            {formik.touched.confirm_password &&
            formik.errors.confirm_password ? (
              <FormFeedback>{formik.errors.confirm_password}</FormFeedback>
            ) : null}
          </div>
        </div>
        <div className="text-center">
          <Button
            color="primary"
            type="submit"
            style={{
              backgroundColor: "#f82f0b",
              outline: "none",
              border: "none",
            }}
          >
            Submit
          </Button>
          <div className="mt-3">
            <span>Already have a account&nbsp;</span>
            <Link
              to="/signin"
              style={{
                textDecoration: "none",
              }}
            >
              Login Now
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
