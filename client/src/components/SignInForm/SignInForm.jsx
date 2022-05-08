import { useFormik } from "formik";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, FormFeedback, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { DataContext } from "../../store/GlobalState";
import { postData } from "../../utils/fetchData";

const SignInForm = () => {
  const { dispatch } = useContext(DataContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .matches(
          // eslint-disable-next-line
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Password must have at least one alphabet letter, one number, and one special character"
        ),
      email: Yup.string()
        .email("Please provide a valid email")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      const res = await postData("auth/signin", values);
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
            <span>You don't have a account&nbsp;</span>
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
              }}
            >
              Register Now
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
