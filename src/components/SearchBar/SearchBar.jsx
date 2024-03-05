import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const searchSchema = Yup.object().shape({
  query: Yup.string().required("Required field"),
});

const notify = () => {
  toast.error("Please type your search query");
};

export default function SearchBar({ onSearch }) {
  return (
    <header>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, action) => {
          onSearch(values.query);
          values.query === "" && notify();
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
        </Form>
      </Formik>
    </header>
  );
}
