"use client";
import { API_USER } from "@/constants/api";
import axios from "axios";
import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";
import ToastNotification, {
  notifyError,
  notifySuccess,
} from "@/components/ui/toast-notification";
import Cookies from "js-cookie";
import GoogleLogin from "@/components/ui/google-login";

interface FormErrors {
  username?: string;
  password?: string;
  rePassword?: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<User>({
    username: "",
    password: "",
    rePassword: "",
    role: "User",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.username) {
      newErrors.username = "Vui lòng nhập tài khoản";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!formData.rePassword) {
      newErrors.rePassword = "Vui lòng nhập lại mật khẩu";
    } else if (formData.rePassword !== formData.password) {
      newErrors.rePassword = "Mật khẩu không trùng khớp";
    }
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Handle form submission logic
      const response = await axios.get(`${API_USER}/${formData.username}`);
      const user = response.data;
      if (user) {
        console.log("User", user);
        const newErrors: FormErrors = {};
        newErrors.username = "Tài khoản đã được sử dụng";
        setErrors(newErrors);
      } else {
        try {
          axios.post(`${API_USER}`, formData);
          Cookies.set("user", JSON.stringify(formData.username), {
            expires: 1, // 1 day
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
          notifySuccess("Đăng ký thành công!!");
          notifySuccess("Đang chuyển hướng trang");
          setTimeout(() => {
            window.location.href = "http://localhost:3000/";
          }, 1000);
        } catch (error) {
          notifyError("Đăng ký thất bại vui lòng kiểm tra lại");
        }
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8">
        <ToastNotification />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Đăng ký tài khoản
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="h-24">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tài khoản
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <span className="text-red font-medium text-sm">
                {errors.username && errors.username}
              </span>
            </div>

            <div className="h-24">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mật khẩu
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <span className="text-red font-medium text-sm">
                {errors.password && errors.password}
              </span>
            </div>
            <div className="h-24">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nhập Lại Mật khẩu
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  id="rePassword"
                  name="rePassword"
                  type="password"
                  autoComplete="current-rePassword"
                  className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <span className="text-red font-medium text-sm">
                {errors.rePassword && errors.rePassword}
              </span>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 hover:bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Đăng ký
              </button>
            </div>
            <GoogleLogin />
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Đã có tài khoản?{" "}
            <Link
              href="/web/login"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-400"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
