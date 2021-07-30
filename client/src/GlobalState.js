import React, { createContext, useState, useEffect } from "react";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  return (
    <GlobalState.Provider value={"Global Value"}>
      {children}
    </GlobalState.Provider>
  );
};
