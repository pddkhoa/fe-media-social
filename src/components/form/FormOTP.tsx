import AccessService from "@/services/access";
import { registerSuccess } from "@/store/authSlice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PinCode, Button, Loader } from "rizzui";

const FormOTP = () => {
  const isActive = useSelector((state: RootState) => state.auth.isActive);
  const isForgotPassword = useSelector(
    (state: RootState) => state.auth.isForgotPassword
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isActive) {
      navigate("/login", { replace: true });
      return;
    }
  }, [navigate, isActive]);

  const [otpCode, setOtpCode] = useState<string | unknown>("");

  const handleSendOTP = async (otp: unknown) => {
    setIsLoading(true);
    const { body } = await AccessService.activeAccount(otp);
    if (body?.success) {
      if (isForgotPassword) navigate("/reset-password");
      else {
        navigate("/login");
        dispatch(registerSuccess());
      }
      toast.success(body.message);
      setIsLoading(false);
    } else {
      toast.error(body?.message || "Error");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5 lg:space-y-8">
      <PinCode
        variant="outline"
        className="pb-2"
        size="lg"
        length={6}
        setValue={setOtpCode}
      />
      {isLoading ? (
        <Button
          className="w-full text-base font-medium flex gap-5"
          type="button"
          size="xl"
          rounded="lg"
          disabled
        >
          Verify OTP
          <Loader />
        </Button>
      ) : (
        <Button
          className="w-full text-base font-medium"
          type="button"
          size="xl"
          rounded="lg"
          onClick={() => handleSendOTP(otpCode)}
        >
          Verify OTP
        </Button>
      )}
    </div>
  );
};

export default FormOTP;
