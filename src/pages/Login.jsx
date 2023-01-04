import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const { user, login } = useContext(AuthContext);

  const onSubmit = async (values, actions) => {
    try {
      await login(values);
    } catch (error) {
      actions.resetForm();
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.user_id) navigate(`/user/${user.user_id}`);
  }, [user]);

  const { values, handleChange, handleSubmit, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: onSubmit,
    });

  return (
    <div className="flex-1 font-inter flex flex-col justify-center items-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 flex flex-col px-10 py-5 rounded border-2 hover:border-[#a667e4] bg-slate-700"
      >
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
        <div className="flex justify-between items-center">
          <p className="text-sm mt-3">No Account?</p>
          <Link to="/register" className="text-sm mt-3 underline">
            Register Here
          </Link>
        </div>
      </form>
    </div>
  );
}
