import FormUpdatePassword from "@/components/form/FormUpdatePassword";
import ProfileHeader from "@/components/profile/ProfileHeader";

const PageTabPassword = () => {
  return (
    <div>
      <ProfileHeader isView={true} />
      <FormUpdatePassword />
    </div>
  );
};

export default PageTabPassword;
