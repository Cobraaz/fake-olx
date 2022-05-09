import { useFormik } from "formik";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Button, FormFeedback, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { DataContext } from "../../store/GlobalState";
import { patchData } from "../../utils/fetchData";
import imageCompression from "browser-image-compression";

import styles from "./profile.module.css";

const passwordRegExp =
  // eslint-disable-next-line
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ProfileForm = ({ user, token }) => {
  const { dispatch } = useContext(DataContext);
  const [avatar, setAvatar] = useState(user.avatar);

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      phone_no: user.phone_no,
      password: "",
      avatar,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone_no: Yup.string()
        .required("Phone Number is required")
        .matches(phoneRegExp, "Phone number is not valid"),
      password: Yup.string().matches(
        passwordRegExp,
        "Password must have at least one alphabet letter, one number, and one special character"
      ),
    }),
    onSubmit: async (values) => {
      const updatedValues = {
        name: values.name,
        phone_no: values.phone_no,
        ...(values.password && { password: values.password }),
        avatar,
      };
      const res = await patchData("auth/profile", updatedValues, token);
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

  const changeAvatar = async (e) => {
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    let file;

    file = await imageCompression(e.target.files[0], {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: 0.3, // optional, initial quality value between 0 and 1 (default: 1)
    });
    if (!file) return toast.error("File does not exist.");

    if (file.size > 1024 * 1024)
      //1mb
      return toast.error("The largest image size is 1mb.");

    if (file.type !== "image/jpeg" && file.type !== "image/png")
      //Image Format
      return toast.error("Image format is incorrect.");

    file = await toBase64(file);
    setAvatar(file);
  };

  return (
    <div
      style={{
        textAlign: "start",
      }}
    >
      <div>
        <div className="mt-4 text-center">
          <img className={styles.profileImg} src={avatar} alt="Avatar" />
        </div>
        <div className="mt-2 mb-3">
          <Input
            type="file"
            name="file"
            id="image"
            accept="image/*"
            onChange={changeAvatar}
          />
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div className="col-12 mb-3">
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
              name="email"
              value={formik.values.email}
              disabled={true}
              required
            />
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
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
