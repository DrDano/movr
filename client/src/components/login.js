import React, { useState, useEffect } from "react"

const Login = ({ url }) => {
  const [loginData, setLoginData] = useState('');
  useEffect(() => {
    const getLoginData = async () => {
      const query = await fetch(`/auth/login`);
      const response = await query.json();
      setLoginData(response);
    };
    getLoginData().catch(console.error);
  }, []);

  return (
    <div>{loginData}</div>
  );
}

export default Login
