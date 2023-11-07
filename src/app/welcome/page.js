"use client";

import { setCurrentUser } from "@/store/features/auth/authSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Welcome() {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();
  const data = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCurrentUser(user));
    }
  }, []);

  // removeRefreshToken()

  let content = null;
  
  if (isLoading) {
    content = (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        Loading...
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        Welcome {user?.data?.username}
        <h1>{user?.created_at}</h1>
      </div>
    );
  } else if (isError) {
    const errorMessage = error?.data?.detail || error?.message || 'An unknown error occurred';
    console.log("error : ",error)
    content = (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        {errorMessage}
      </div>
    );
  }

  return content;
}
