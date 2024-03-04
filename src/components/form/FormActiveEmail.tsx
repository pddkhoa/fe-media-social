import AccessService from "@/services/access";
import { forgotPasswordPending } from "@/store/authSlice";
import { RULES } from "@/utils/rules";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, Loader } from "rizzui";
import * as Yup from "yup";

const FormActiveEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().matches(RULES.email).required("Email is required."),
    }),

    validateOnChange: true,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const { body } = await AccessService.forgotPassword({
          email: values.email,
        });
        if (body?.success) {
          dispatch(forgotPasswordPending(values.email));
          navigate("/active-account");
          setIsLoading(false);
          toast.success(body.message);
        } else {
          setIsLoading(false);
          toast.error(body?.message || "Error");
        }
      } catch (error) {
        setIsLoading(false);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-5">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          size="lg"
          placeholder="Enter your email"
          className="[&>label>span]:font-medium"
          color="info"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />

        {isLoading ? (
          <Button
            className="w-full flex gap-5"
            type="submit"
            size="lg"
            disabled
          >
            Send OTP <Loader />
          </Button>
        ) : (
          <Button className="w-full" type="submit" size="lg">
            Send OTP
          </Button>
        )}
      </div>
    </form>
  );
};

export default FormActiveEmail;
