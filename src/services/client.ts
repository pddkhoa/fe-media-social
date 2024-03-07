import identity from "@/api/interceptor";
import { requestApiHelper } from "@/utils/apiRequest";

class ClientServices {
  static async uploadAvatar(form: FormData) {
    type body = {
      success: string;
      statusCode: number;
      message: string;
      result: {
        publicId: string;
        url: string;
      };
    };
    return await requestApiHelper<body>(
      identity.put("user/changeAvatar", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  }
  static async updateInfo(data: {
    username: string;
    name: string;
    phone: string;
    second_name: string;
    gender: string;
    email: string;
    Descriptions: string;
    address: string;
  }) {
    type body = {
      success: string;
      statusCode: number;
      message: string;
      result: {
        publicId: string;
        url: string;
      };
    };
    return await requestApiHelper<body>(
      identity.patch("/user/changeInfo", data)
    );
  }
  static async resetPassword(data: {
    oldPassword: string;
    password: string;
    confirmPassword: string;
  }) {
    type body = {
      success: string;
      statusCode: number;
      message: string;
      result: {
        publicId: string;
        url: string;
      };
    };
    return await requestApiHelper<body>(
      identity.patch("/user/resetPassword", data)
    );
  }
}

export default ClientServices;
