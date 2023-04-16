import React, { useEffect } from "react";
import useBlogCall from "../hooks/useBlogCall";
import { useSelector } from "react-redux";
import { object, string } from "yup";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { Category } from "../feature/blogSlice";

interface Prop {
  id: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditModal = ({ id, showModal, setShowModal }: Prop) => {
  const { getCategories, editBlog } = useBlogCall();
  const { categories, details } = useSelector((state: any) => state.blog);

  useEffect(() => {
    getCategories();
  }, []);

  const EditBlogScheme = object({
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
    <div className={`relative z-50 ${showModal || "hidden"}`}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="bg-blue-100/20 border w-96 md:w-auto px-5 backdrop-blur-xl pb-3 rounded">
            <Formik
              initialValues={{
                title: details.title,
                image: details.image,
                category: details.category,
                content: details.content,
                status: details.status,
              }}
              onSubmit={(values, actions) => {
                editBlog(id, {
                  ...values,
                  status: values.status === "Draft" ? "d" : "p",
                });
                setShowModal(false);
                actions.resetForm();
                actions.setSubmitting(false);
              }}
              validationSchema={EditBlogScheme}
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
                        <div className="text-xs text-center text-red-600">
                          {msg}
                        </div>
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
                        <div className="text-xs text-center text-red-600">
                          {msg}
                        </div>
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
                        <div className="text-xs text-center text-red-600">
                          {msg}
                        </div>
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
                        <div className="text-xs text-center text-red-600">
                          {msg}
                        </div>
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
                        <div className="text-xs text-center text-red-600">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="px-4  sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
