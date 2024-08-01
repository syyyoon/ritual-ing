// import React, { useState, createContext, useContext, ReactNode, FC } from "react";

// interface AuthContextType {
//   isLoggedIn: boolean;
//   logIn: () => void;
//   logOut: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//   const logIn = () => setIsLoggedIn(true);
//   const logOut = () => setIsLoggedIn(false);

//   return <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>{children}</AuthContext.Provider>;
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
