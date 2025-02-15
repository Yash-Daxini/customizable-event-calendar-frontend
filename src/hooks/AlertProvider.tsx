import React, { createContext, useState, useContext, ReactNode } from "react";
import { Alert } from "react-bootstrap";

export interface AlertContextType {
    showAlert: (title: string, message: string, variant?: variantType) => void
}

const AlertContext = createContext<AlertContextType | null>(null);

interface AlertProviderProps {
    children: ReactNode; // This ensures the `children` prop is properly typed
}

type variantType = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

interface AlertProps {
    title: string;
    body: any;
    variant?: variantType;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }: AlertProviderProps) => {

    const [alert, setAlert] = useState<AlertProps | null>(null);

    const showAlert = (title: string, body: any, variant: variantType = "primary") => {
        setAlert({ title, body: body, variant });
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alert && (
                <div
                    style={{
                        position: "fixed",
                        top: "20%",
                        left: "15%",
                        zIndex: 1000,
                        width: "900px",
                    }}
                >
                    <Alert variant={alert.variant} onClose={() => setAlert(null)} dismissible>
                        <strong>{alert.title}</strong>
                        {alert.body}
                    </Alert>
                </div>
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
};
