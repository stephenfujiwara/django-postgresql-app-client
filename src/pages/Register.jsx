import { useFormik } from "formik";
import { registerSchema } from "../schemas";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:8000/api/";

export default function Register() {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    await axios({
      method: "POST",
      url: `${url}register/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(values),
    });
    navigate("/login");
    actions.resetForm();
  };

  const { values, handleChange, handleSubmit, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        email: "",
        username: "",
        password: "",
      },
      validationSchema: registerSchema,
      onSubmit: onSubmit,
    });

  return (
    <div className="font-inter flex-1 flex flex-col justify-center items-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 flex flex-col px-10 py-5 rounded border-2 hover:border-[#a667e4] bg-slate-700"
      >
        <label htmlFor="email" className="font-bold block text-left mb-1">
          Email
        </label>
        <input
          id="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Please enter your email..."
          className="py-1 px-2 border-2 border-[#4a5568] rounded-md mb-2"
        />
        {errors.email && touched.email && (
          <p className="text-red-500 text-sm mb-1">{errors.email}</p>
        )}
        <label htmlFor="username" className="font-bold block text-left mb-1">
          Username
        </label>
        <input
          id="username"
          value={values.username}
          onChange={handleChange}
          placeholder="Please enter your username..."
          className="py-1 px-2 border-2 border-[#4a5568] rounded-md mb-2"
        />
        {errors.username && touched.username && (
          <p className="text-red-500 text-sm mb-1">{errors.username}</p>
        )}
        <label htmlFor="password" className="font-bold block text-left mb-1">
          Password
        </label>
        <input
          id="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Please enter your password..."
          type="password"
          className="py-1 px-2 border-2 border-[#4a5568] rounded-md mb-2"
        />
        {errors.password && touched.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
        <button
          type="submit"
          className={`block border-2 border-[#4a5568] bg-white rounded font-bold mt-6 py-1 px-2 text-center ${
            isSubmitting && "opacity-50"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
