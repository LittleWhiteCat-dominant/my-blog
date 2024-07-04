import React, { createContext, useContext, useState, useCallback } from "react";

const LoadingContext = createContext({
  registerModel: (modelId) => {},
  unregisterModel: (modelId) => {},
  isLoading: true,
});

export function useLoading() {
  return useContext(LoadingContext);
}

export function LoadingProvider({ children }) {
  const [loadingModels, setLoadingModels] = useState(new Set());

  const registerModel = useCallback((modelId) => {
    console.log("registerModel");
    setLoadingModels((prev) => new Set(prev.add(modelId)));
  }, []);

  const unregisterModel = useCallback((modelId) => {
    console.log("unregisterModel");
    setLoadingModels((prev) => {
      const newSet = new Set(prev);
      newSet.delete(modelId);
      return newSet;
    });
  }, []);

  const isLoading = loadingModels.size > 0;

  return (
    <LoadingContext.Provider
      value={{
        registerModel,
        unregisterModel,
        isLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
