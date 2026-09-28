import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const USER_STORAGE_KEY = "routemate-user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email, password) => {
    if (!email || !password) {
      return {
        success: false,
        message: "Email and password are required.",
      };
    }

    const demoUser = {
      id: "user-001",
      name: "RouteMate User",
      email,
    };

    setUser(demoUser);

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(demoUser));

    return {
      success: true,
      user: demoUser,
    };
  };

  const register = (name, email, password) => {
    if (!name || !email || !password) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
    };

    setUser(newUser);

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));

    return {
      success: true,
      user: newUser,
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
