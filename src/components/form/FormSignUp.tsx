import AccessService from "@/services/access";
import { registerPending } from "@/store/authSlice";
import { RULES } from "@/utils/rules";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PiArrowRightBold, PiCheckBold, PiXBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Password,
  Checkbox,
  Button,
  Select,
  NumberInput,
  Loader,
} from "rizzui";
import * as Yup from "yup";

type optionsGender = {
  label: string;
  value: string;
};

const FormSignUp = () => {
  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  const [valueGender, setValueGender] = useState<optionsGender>(options[0]);
  const [showCheckPwd, setShowCheckPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTerm, setIsTerm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function removeWhitespace(str: string) {
    return str.replace(/\s+/g, "");
  }

  useEffect(() => {
    formik.setFieldValue("gender", valueGender);
  }, [valueGender]);

  const [requirementsMet, setRequirementsMet] = useState<any>({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
    space: true,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;

    formik.setFieldValue("password", password);

    const containsSpace = /\s/.test(password);
    const lengthCheck = password.length >= 8;
    const lowercaseCheck = /[a-z]/.test(password);
    const uppercaseCheck = /[A-Z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const specialCharCheck = /[@#$%^_&+=]/.test(password);

    setRequirementsMet({
      length: lengthCheck,
      lowercase: lowercaseCheck,
      uppercase: uppercaseCheck,
      number: numberCheck,
      specialChar: specialCharCheck,
      space: containsSpace,
    });

    setShowCheckPwd(password.length > 0);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      second_name: "",
      email: "",
      phone: "",
      gender: "",
      username: "",
      password: "",
      confirm_password: "",
      roles: "Client",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required."),
      password: Yup.string()
        .matches(RULES.password, "Password invalid")
        .required("Password is required."),
      name: Yup.string().required("Full name is required"),
      second_name: Yup.string().required("Second name is required"),
      phone: Yup.string().required("Phone is required"),
      email: Yup.string()
        .matches(RULES.email, "Email invalid")
        .required("Email is required."),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
      gender: Yup.object().test(
        "gender",
        "Gender is required",
        (value: unknown) => {
          if (!value) {
            return false;
          }
          return true;
        }
      ),
    }),

    validateOnChange: true,
    onSubmit: async (values) => {
      const report = {
        name: values.name,
        second_name: values.second_name,
        email: values.email,
        phone: removeWhitespace(values.phone.toString()),
        gender: valueGender?.value,
        username: values.username,
        password: values.password,
        roles: "user",
      };
      setIsLoading(true);
      try {
        const { body } = await AccessService.register(report);
        if (body?.success) {
          setIsLoading(false);
          toast.success(body.message);
          navigate("/active-account");
          dispatch(registerPending());
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
      <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5">
        <Input
          id="name"
          name="name"
          type="text"
          size="lg"
          label="Full Name"
          placeholder="Enter your full name"
          className="[&>label>span]:font-medium"
          color="info"
          inputClassName="text-sm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Input
          id="second_name"
          name="second_name"
          type="text"
          size="lg"
          label="Second Name"
          placeholder="Enter your second name"
          className="[&>label>span]:font-medium"
          color="info"
          inputClassName="text-sm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.second_name}
          error={formik.errors.second_name}
        />
        <Input
          id="email"
          name="email"
          type="email"
          size="lg"
          label="Email"
          className="col-span-2 [&>label>span]:font-medium"
          inputClassName="text-sm"
          color="info"
          placeholder="Enter your email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Select
          id="gender"
          name="gender"
          label="Select"
          options={options}
          value={valueGender}
          onChange={setValueGender}
          error={formik.errors.gender}
          optionClassName="hover:bg-gray-300/90"
        />
        <NumberInput
          id="phone"
          name="phone"
          formatType="pattern"
          format="### ### ####"
          mask="_"
          customInput={Input as any}
          {...{ label: "Phone Number" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        <Input
          id="username"
          name="username"
          size="lg"
          label="Username"
          className="col-span-2 [&>label>span]:font-medium"
          inputClassName="text-sm"
          color="info"
          placeholder="Enter your username"
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
          size="lg"
          className="[&>label>span]:font-medium"
          color="info"
          inputClassName="text-sm"
          onChange={handlePasswordChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <Password
          id="confirm_password"
          name="confirm_password"
          label="Confirm Password"
          placeholder="Enter confirm password"
          size="lg"
          className="[&>label>span]:font-medium"
          color="info"
          inputClassName="text-sm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirm_password}
          error={formik.errors.confirm_password}
        />
        {showCheckPwd ? (
          <ul className="col-span-2 space-y-2 animate-in duration-300 transition-all">
            {Object.entries({
              "At least 8 characters": requirementsMet.length,
              "At least one lowercase letter": requirementsMet.lowercase,
              "At least one uppercase letter": requirementsMet.uppercase,
              "At least one number": requirementsMet.number,
              "At least one special character": requirementsMet.specialChar,
              "Password cannot contain spaces": !requirementsMet.space,
            }).map(([label, met]) => (
              <li
                key={label}
                className={`text-base flex justify-between  w-full ${
                  met ? "text-green-500" : "text-red-500"
                }`}
              >
                <span>{label}</span>
                {met ? <PiCheckBold /> : <PiXBold />}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="col-span-2 flex items-start ">
          <Checkbox
            onChange={() => setIsTerm(true)}
            className="[&>label>span]:font-medium [&>label]:items-start"
            label={
              <>
                By signing up you have agreed to our{" "}
                <Link
                  to="/"
                  className="font-medium text-blue transition-colors hover:underline"
                >
                  Terms
                </Link>{" "}
                &{" "}
                <Link
                  to="/"
                  className="font-medium text-blue transition-colors hover:underline"
                >
                  Privacy Policy
                </Link>
              </>
            }
          />
        </div>
        {isLoading ? (
          <Button
            size="lg"
            type="submit"
            disabled
            className="col-span-2 mt-2 flex gap-5"
          >
            <span>Get Started</span> <Loader />
          </Button>
        ) : (
          <Button
            disabled={formik.isSubmitting || !formik.isValid || !isTerm}
            size="lg"
            type="submit"
            className="col-span-2 mt-2"
          >
            <span>Get Started</span>{" "}
            <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t have an account?{" "}
        <Link
          to={"/sign-in"}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default FormSignUp;
