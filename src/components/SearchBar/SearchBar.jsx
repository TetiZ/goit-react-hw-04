import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { CiSearch } from "react-icons/ci";

const notify = () => {
  toast.error("Please type your search query");
  return;
};

export default function SearchBar({ onSearch }) {
  return (
    <header>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, action) => {
          values.query === "" && notify();
          onSearch(values.query);
          action.resetForm();
        }}
      >
        <Form className={css.form}>
          <div className={css.inputWrapper}>
            <Field
              className={css.input}
              name="query"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            ></Field>
            <button className="btn" type="submit">
              <CiSearch />
            </button>
          </div>

          <ErrorMessage name="query" component="div"></ErrorMessage>
        </Form>
      </Formik>
    </header>
  );
}
