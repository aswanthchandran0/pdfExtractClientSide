import { useFormik } from "formik";
import { signinSchema } from "../../assets/validation/auth/authSchema";
import toast from "react-hot-toast";
import { signinApi } from "../../service/user/api";

export const useSigninForm = (onSubmit: (values: { email: string; password: string }) => void)=>{
return useFormik({
    initialValues:{
        email:'',
        password:'',
    },
    validationSchema:signinSchema,
    onSubmit: async(values,{setSubmitting})=>{
        setSubmitting(true)
        try {
          const response = await signinApi(values)
          console.log('response',response)
            await onSubmit(values); // Ensure onSubmit is async
    }
    catch{
      console.log("error in sign")
        toast.error("signin failed. Please try again.");

      } finally {
        setSubmitting(false);
      }
    }
})
}