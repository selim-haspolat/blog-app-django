import { useSelector } from "react-redux";
import useBlogCall from "../hooks/useBlogCall";
import { useEffect } from "react";
import { Category } from "../feature/blogSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { string, object } from "yup";

const NewBlog = () => {
  const { getCategories, postBlog } = useBlogCall();
  const { categories } = useSelector((state: any) => state.blog);

  useEffect(() => {
    getCategories();
  }, []);

  const NewBlogScheme = object({
    title: string().max(30).min(3).required(),
    image: string()
      .matches(/^(https?:\/\/)?(www\.)?.*$/, "Enter url!")
      .max(200)
      .min(5)
      .required(),
    category: string().required(),
    status: string().required(),
    content: string().max(500).min(10).required(),
  });

  return (
    <div>
      <h1 className="text-5xl font-light text-center mt-5">New Blog</h1>
      <Formik
        initialValues={{
          title: "",
          image: "",
          category: "Trivia",
          content: "",
          status: "Published",
        }}
        onSubmit={(values, actions) => {
          postBlog({
            ...values,
            status: values.status === "Draft" ? "d" : "p",
          });
          actions.resetForm();
          actions.setSubmitting(false);
        }}
        validationSchema={NewBlogScheme}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3 w-[95%] md:w-[500px] mx-auto mt-10">
            <div className="flex flex-col">
              <Field
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                className="border outline-none px-2 py-1 focus:border-blue-400"
              />
              <ErrorMessage name="title">
                {(msg) => (
                  <div className="text-xs text-center text-red-600">{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div className="flex flex-col">
              <Field
                type="url"
                name="image"
                id="image"
                placeholder="Image url"
                className="border outline-none px-2 py-1 focus:border-blue-400"
              />
              <ErrorMessage name="url">
                {(msg) => (
                  <div className="text-xs text-center text-red-600">{msg}</div>
                )}
              </ErrorMessage>
            </div>
            <div className="flex flex-col">
              <Field
                as="select"
                id="category"
                name="category"
                className="border outline-none px-2 py-1 focus:border-blue-400"
              >
                {categories.map((category: Category) => (
                  <option key={category.id}>{category.name}</option>
                ))}
              </Field>
              <ErrorMessage name="category">
                {(msg) => (
                  <div className="text-xs text-center text-red-600">{msg}</div>
                )}
              </ErrorMessage>
            </div>
            <div className="flex flex-col">
              <Field
                as="select"
                id="status"
                name="status"
                className="border outline-none px-2 py-1 focus:border-blue-400"
              >
                <option>Published</option>
                <option>Draft</option>
              </Field>
              <ErrorMessage name="status">
                {(msg) => (
                  <div className="text-xs text-center text-red-600">{msg}</div>
                )}
              </ErrorMessage>
            </div>

            <div className="flex flex-col">
              <Field
                as="textarea"
                name="content"
                id="content"
                className="border outline-none px-2 py-1 focus:border-blue-400"
                placeholder="Content"
              />
              <ErrorMessage name="content">
                {(msg) => (
                  <div className="text-xs text-center text-red-600">{msg}</div>
                )}
              </ErrorMessage>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="border block mx-auto border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 transition-colors py-1 md:py-1.5 w-40 rounded"
            >
              New Blog
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewBlog;
