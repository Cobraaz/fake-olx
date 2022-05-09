import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  CardImg,
  FormFeedback,
  Input,
  Label,
  FormGroup,
} from "reactstrap";
import * as Yup from "yup";

import { postData } from "../../utils/fetchData";

import imageCompression from "browser-image-compression";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { categoryArray } from "../../utils/helper.function";

const CreateADForm = () => {
  const [image, setImage] = useState("");
  const history = useHistory();

  const addImage = async (e) => {
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
    setImage(file);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      category: "car",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number().required("Price is required"),
    }),
    onSubmit: async (values) => {
      if (!image) return toast.error("Image is required");
      const updatedValues = { ...values, image };

      const res = await postData("advertisement/create-ad", updatedValues);
      if (res.err) {
        return res.err.map(({ msg }) => toast.error(msg));
      }
      history.push("/");
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
            <Label>Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Enter Your Name"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              invalid={!!(formik.touched.title && formik.errors.title)}
              required
            />
            {formik.touched.title && formik.errors.title ? (
              <FormFeedback>{formik.errors.title}</FormFeedback>
            ) : null}
          </div>
          <div className="mb-3">
            <Label>Description</Label>
            <Input
              type="text"
              autoComplete="off"
              id="description"
              placeholder="Enter Your Name"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              invalid={
                !!(formik.touched.description && formik.errors.description)
              }
              required
            />
            {formik.touched.description && formik.errors.description ? (
              <FormFeedback>{formik.errors.description}</FormFeedback>
            ) : null}
          </div>
          <div className="col-12 mb-3">
            <Label>Category</Label>
            <Input
              type="select"
              id="category"
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            >
              {categoryArray.map(({ value, name }, index) => (
                <option value={value} key={index}>
                  {name}
                </option>
              ))}
            </Input>
          </div>
          <div className="mb-3">
            <Label>Price</Label>
            <Input
              type="number"
              id="price"
              placeholder="Enter Your Name"
              name="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              invalid={!!(formik.touched.price && formik.errors.price)}
              required
            />
            {formik.touched.price && formik.errors.price ? (
              <FormFeedback>{formik.errors.price}</FormFeedback>
            ) : null}
          </div>
        </div>
        <FormGroup>
          <Label>Image</Label>
          {image && (
            <CardImg
              alt="Card image cap"
              className="mb-3"
              src={image}
              top
              width="100%"
            />
          )}
          <Input
            type="file"
            name="file"
            id="image"
            accept="image/*"
            onChange={addImage}
          />
        </FormGroup>
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
        </div>
      </form>
    </div>
  );
};

export default CreateADForm;
