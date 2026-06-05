import {
  createContext,
  useContext,
  useState
} from "react";

const ResumeContext =
  createContext();

export const ResumeProvider =
({ children }) => {

  const [pendingResume,
    setPendingResume] =
    useState(null);

  return (

    <ResumeContext.Provider
      value={{
        pendingResume,
        setPendingResume
      }}
    >

      {children}

    </ResumeContext.Provider>

  );

};

export const useResume =
  () =>
    useContext(
      ResumeContext
    );