'use client';

import React, { useState } from 'react';
import FacebookLogin, { SuccessResponse } from '@greatsumini/react-facebook-login';
import { FB_APP_ID } from '@/constants/Code';
import axios from 'axios';
import Image from 'next/image'

export default function FaceBookButton() {
  const [message, setMessage] = useState<{ text: string; severity: 'error' | 'success' } | null>(null);

  const onSuccesHandeler = async (response: SuccessResponse) => {

    try {
      const { data } = await axios.post("http://localhost:1201/api/auth/facebook-login", {
        userID: response.userID,
        accessToken: response.accessToken
      });

      console.log("API Response:", data);
      sessionStorage.setItem('uid', data.token)

      if (data.success) {
        setMessage({ text: `${data.msg}`, severity: "success" });
      } else {
        setMessage({ text: "Facebook Login Failed!", severity: "error" });
      }
    } catch (error) {
      console.error("Error during API request:", error);
      setMessage({ text: "An error occurred!", severity: "error" });
    }
  };

  return (
    <React.Fragment>
      <FacebookLogin
        appId={FB_APP_ID}
        scope="public_profile,email"
        onSuccess={onSuccesHandeler}
        onFail={(error) => {
          console.error("Facebook Login Failed:", error);
          setMessage({ text: "An Error occurred!", severity: "error" });
        }}
        render={({ onClick }) => (
          <button onClick={onClick} className='btn btn-primary mt-4'>
            Continue with Facebook
          </button>
        )}
      />

      {message && (
        <div style={{ color: message.severity === "error" ? "red" : "green" }}>
          {message.text}
        </div>
      )}
    </React.Fragment>
  );
}
