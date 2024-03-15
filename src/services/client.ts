import identity from "@/api/interceptor";
import { Category } from "@/type/category";
import { Post } from "@/type/post";
import { Tag } from "@/type/tag";
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
  static async getBlogUser() {
    type body = {
      success: string;
      statusCode: number;
      message: string;
      result: Post[];
    };
    return await requestApiHelper<body>(identity.get("blog/allBlog"));
  }
  static async uploadAvatarPost(form: FormData) {
    type body = {
      success: string;
      statusCode: number;
      message: string;
      result: string;
    };
    return await requestApiHelper<body>(
      identity.post("blog/uploadImage", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  }
  static async getCategoriesByUser() {
    type body = {
      success: string;
      statusCode: number;
      message: string;
      result: Category[];
    };
    return await requestApiHelper<body>(
      identity.get("category/userCategories")
    );
  }
  static async getAllTags() {
    type body = {
      success: string;
      statusCode: number;
      message: string;
      result: Tag[];
    };
    return await requestApiHelper<body>(identity.get("tag/allTag"));
  }
  static async addTags(data: { name: string }) {
    type body = {
      success: string;
      statusCode: number;
      message: string;
      result: Tag;
    };
    return await requestApiHelper<body>(identity.post("tag/addTag", data));
  }
  static async addCategories(data: {
    name: string;
    description: string;
    tagIds: string;
    status: string;
    userIds: string;
  }) {
    type body = {
      success: string;
      statusCode: number;
      message: string;
      result: Category;
    };
    return await requestApiHelper<body>(identity.post("tag/addTag", data));
  }
  static async getAllCategories() {
    type body = {
      success: string;
      statusCode: number;
      message: string;
      result: Category[];
    };
    return await requestApiHelper<body>(identity.get("category/allCategories"));
  }
  static async getCategoriesById(categoryId: string) {
    type body = {
      success: string;
      statusCode: number;
      message: string;
      result: Category;
    };
    return await requestApiHelper<body>(
      identity.get(`category?categoryId=${categoryId}`)
    );
  }
}

export default ClientServices;
