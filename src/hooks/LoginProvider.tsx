import React, { ReactNode, useContext, useState } from 'react'
import { LoadingContext } from './context';

interface LoginProviderProps{
    children: ReactNode;
}

const LoginProvider: React.FC<LoginProviderProps> = ({ children }:LoginProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) throw new Error("useLoading must be used within a LoadingProvider");
    return context;
};

export default LoginProvider