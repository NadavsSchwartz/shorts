/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom';
import { getUserDetails, getUserStats } from 'store/actions/userActions';
import viewsRoutes from 'views/routes';
import { useDispatch, useSelector } from 'react-redux';
const Routes = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user } = userDetails;
  useEffect(() => {
    dispatch(getUserDetails());
    if (user) dispatch(getUserStats());
  }, []);

  return (
    <ReactRoutes>
      {viewsRoutes.map((item, i) => (
        <Route key={i} path={item.path} element={item.renderer()} />
      ))}

      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </ReactRoutes>
  );
};

export default Routes;
