const { useContext, createContext, useState } = require("react");

const LoginContext = createContext(null);

export const useLoginContext = () => useContext(LoginContext);

export const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        showPopup,
        setShowPopup,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
