import { Button, Input } from "rizzui";

const FormActiveEmail = () => {
  return (
    <>
      <div className="space-y-5 ">
        <Input
          type="email"
          label="Email"
          size="lg"
          placeholder="Enter your email"
          className="[&>label>span]:font-medium"
          color="info"
        />
        <Button className="w-full" type="submit" size="lg">
          Reset Password
        </Button>
      </div>
    </>
  );
};

export default FormActiveEmail;
