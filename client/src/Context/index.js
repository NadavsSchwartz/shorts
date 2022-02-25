/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const userContext = createContext({});
export default function Context(props) {
  const [userObject, SetUserObject] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:4000/me', {
        withCredentials: true,
      })
      .then(({ data }) => {
        if (data) {
          SetUserObject(data);
        }
      });
  }, []);

  return (
    <userContext.Provider value={userObject}>
      {props.children}
    </userContext.Provider>
  );
}
