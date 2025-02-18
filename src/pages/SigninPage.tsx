import { Lock, Mail, Sparkles } from "lucide-react";
import PrimaryInputField from "../components/ui/inputBox/PrimaryInputField";
import { useNavigate } from "react-router-dom";
import PrimaryLongButton from "../components/ui/button/PrimaryLongButton";
import { useSigninForm } from "../hooks/useSigninForm/useSigninForm";
import toast from "react-hot-toast";
import { signinApi } from "../service/user/api";
const SigninPage = () => {
  const navigate = useNavigate();

  

  // handle signin
  const handleSignin = async (values: { email: string; password: string }) =>{
    try{
       console.log('Submitted values',values)
       await signinApi(values)
      toast.success("signin successful!")
    }catch(error){
      console.log(error)
      toast.error("Login failed. Please try again.");
    }
  }
  const formik = useSigninForm(handleSignin);
  return (
    <>
      <div className="w-full min-h-screen px-4 pt-6 bg-gradient-to-b from-purple-50 to-white">
        <div className="flex flex-row items-center gap-4 px-4 mb-10 ">
          <Sparkles size={25} className="text-indigo-600 " />
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-semibold cursor-pointer text-slate-900"
          >
            PDFExtract
          </h1>
        </div>

        <div className="flex flex-col items-center px-4 mx-auto mb-12 max-w-7xl ">
          <h1 className="mt-3 mb-3 text-4xl font-bold text-slate-900">
            Welcome back{" "}
          </h1>
          <span className="text-lg font-semibold text-slate-600">
            Sign in to access your PDF tools
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 px-4 mx-auto max-w-7xl">
          <PrimaryInputField
            Icon={Mail}
            placeholder="example@gmail.com"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email ? formik.errors.email : undefined}
            type="email"
            label="Email"
          />
          <PrimaryInputField
            Icon={Lock}
            placeholder="**********"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password? formik.errors.password : undefined}
            type="password"
            label="Password"
          />

          <div className="flex flex-col items-center justify-center w-full max-w-lg p-2 space-y-3 rounded-lg bg-indigo-50 ">
            <PrimaryLongButton onClick={formik.handleSubmit} disabled={formik.isSubmitting} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
