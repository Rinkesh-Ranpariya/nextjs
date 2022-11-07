import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { Form, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getUsers, setUser, updateUser } from "../../store/userSlice";
import { openToast } from "../../store/toastSlice";

const User = () => {
  const dispatch = useDispatch();
  const { push, query } = useRouter();
  const { allUsers } = useSelector((state) => state.users);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setValues,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      designation: "",
      description: "",
      email: "",
      phone: "",
      gender: "Male",
      // website: "",
      // company: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name must be required"),
      designation: yup.string().required("Designation must be required"),
      description: yup.string().required("Description must be required"),
      email: yup.string().email().required("Email must be required"),
      phone: yup
        .string()
        .matches(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
          "Phone number is not valid"
        )
        .required("Phone Number must be required"),
      gender: yup.string().required("Gender must be required"),
      // website: yup.string().url().required("Website URL must be required"),
      // company: yup.string().required("Company Name must be required"),
    }),
    onSubmit: (values) => {
      if (query.addUpdate === "update") {
        dispatch(updateUser({ ...values })).then((res) => {
          if (res.type.includes("fulfilled")) {
            dispatch(
              openToast({
                message: "User Updated Successfully !",
                type: "success",
              })
            );
            dispatch(getUsers());
            push("/");
          }
        });
      } else {
        dispatch(setUser({ id: new Date(), ...values })).then((res) => {
          if (res.type.includes("fulfilled")) {
            dispatch(
              openToast({
                message: "User Added Successfully !",
                type: "success",
              })
            );
            dispatch(getUsers());
            push("/");
          }
        });
      }
      resetForm();
    },
  });

  useEffect(() => {
    // if(query.addUpdate === "update" && !query.userId){
    //   push("/")
    // }
    if (query.addUpdate === "update") {
      let singleUserData = allUsers.filter(
        (user) => user.id == query.userId
      )[0];
      setValues({ ...singleUserData });
    }
  }, [query]);

  return (
    <div className="flex justify-center items-center w-full">
      <Paper
        elevation={4}
        sx={{ maxWidth: 1000 }}
        className="p-5 rounded w-full"
      >
        <Formik>
          <Form onSubmit={handleSubmit} className="w-full">
            <div>
              <TextField
                size="small"
                className="mb-3 w-full"
                name="name"
                type="text"
                id="name"
                label="Name"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={touched.name && Boolean(errors.name)}
              />
              <div className="h-6 -mt-2 text-xs text-red-500">
                {touched.name ? errors.name : ""}
              </div>
            </div>
            <div>
              <TextField
                size="small"
                className="mb-3 w-full"
                name="designation"
                type="text"
                id="designation"
                label="Designation"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.designation}
                error={touched.designation && Boolean(errors.designation)}
              />
              <div className="h-6 -mt-2 text-xs text-red-500">
                {touched.designation ? errors.designation : ""}
              </div>
            </div>
            <div>
              <TextField
                size="small"
                className="mb-3 w-full"
                name="description"
                type="text"
                id="description"
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={touched.description && Boolean(errors.description)}
              />
              <div className="h-6 -mt-2 text-xs text-red-500">
                {touched.description ? errors.description : ""}
              </div>
            </div>
            <div>
              <TextField
                size="small"
                className="mb-3 w-full"
                name="email"
                type="text"
                id="email"
                label="Email"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
              />
              <div className="h-6 -mt-2 text-xs text-red-500">
                {touched.email ? errors.email : ""}
              </div>
            </div>
            <div>
              <TextField
                size="small"
                className="mb-3 w-full"
                name="phone"
                type="text"
                id="phone"
                label="Phone"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                error={touched.phone && Boolean(errors.phone)}
              />
              <div className="h-6 -mt-2 text-xs text-red-500">
                {touched.phone ? errors.phone : ""}
              </div>
            </div>
            <FormControl error={touched.gender && Boolean(errors.gender)}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                id="gender"
                name="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              <div className="h-6 -mt-2 text-xs text-red-500">
                {touched.gender ? errors.gender : ""}
              </div>
            </FormControl>

            <div className="flex justify-end">
              <Button
                onClick={() => {
                  resetForm();
                  push("/");
                }}
                variant="contained"
                className="m-1"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" className="m-1">
                {query.addUpdate === "update" ? "Edit User" : "Add User"}
              </Button>
            </div>
          </Form>
        </Formik>
      </Paper>
    </div>
  );
};

export default User;
