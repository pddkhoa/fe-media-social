import AccessService from "@/services/access";
import { loginSuccess, registerPending } from "@/store/authSlice";
import { UNVERIFIED } from "@/utils/contants";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Input, Password, Button, Loader } from "rizzui";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";

const FormSignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required("Username is required."),
            password: Yup.string().required("Password is required."),
        }),

        validateOnChange: true,
        onSubmit: async (values) => {
            setIsLoading(true);
            const { body } = await AccessService.login(values);
            try {
                if (body?.success) {
                    localStorage.setItem("accessToken", body?.result);
                    navigate("/");
                    setIsLoading(false);
                    dispatch(loginSuccess(jwtDecode(body?.result)));
                    toast.success(body.message);
                } else {
                    if (body?.result === UNVERIFIED) {
                        dispatch(registerPending());
                        navigate("/active-account");
                    }
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
            <div className="space-y-8 p-5">
                <Input
                    id="username"
                    name="username"
                    label="Username"
                    placeholder="Enter your username"
                    color="info"
                    className="[&>label>span]:font-medium"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    error={formik.errors.username}
                />
                <Password
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    color="info"
                    className="[&>label>span]:font-medium"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={formik.errors.password}
                />
                <div className="flex items-center justify-end">
                    {/* <Switch
                        variant="flat"
                        label="Remember Me"
                        color="info"
                        className="[&>label>span]:font-medium [&>label]:my-1"
                    /> */}
                    <Link
                        to={"/forgot-password"}
                        className="h-auto p-0 text-sm font-medium text-gray-900 underline transition-colors hover:text-primary hover:no-underline"
                    >
                        Forget Password?
                    </Link>
                </div>
                {isLoading ? (
                    <Button
                        className="w-full flex gap-5"
                        type="submit"
                        disabled
                    >
                        Sign In
                        <Loader />
                    </Button>
                ) : (
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid}
                    >
                        Sign In
                    </Button>
                )}
            </div>
            <div className="mt-8 text-center text-[15px] leading-loose text-gray-500 lg:mt-9 xl:text-base">
                Don’t have an account?{" "}
                <Link
                    to={"/sign-up"}
                    className="font-bold text-gray-700 transition-colors hover:text-primary"
                >
                    Sign Up
                </Link>
            </div>
        </form>
    );
};

export default FormSignIn;
