import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const searchSchema = Yup.object().shape({
  query: Yup.string()
    .min(1, "too short")
    .max(50, "too long")
    .required("required"),
});

const notify = () => {
  toast.error("Please type your query");
};

export default function SearchBar({ onSearch }) {
  return (
    <header>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, action) => {
          onSearch(values.query);
          values.query.trim() === "" && notify();
          action.resetForm();
        }}
        validationSchema={searchSchema}
      >
        <Form>
          <Field
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          ></Field>
          <ErrorMessage name="query" component="div"></ErrorMessage>

          <button type="submit">Search</button>
          <Toaster />
        </Form>
      </Formik>
    </header>
  );
}
