import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import { ProfileContextProvider } from "./context/ProfileContext.jsx";
import { TradingYearProvider } from "./context/TradingYearContext.jsx";
import { SelfAssessmentContextProvider } from "./context/SelfAssessmentContext.jsx";
import { FinancialStatementsContextProvider } from "./context/FinancialStatementsContext.jsx";
import { IDDocumentsContextProvider } from "./context/IDDocumentsContext.jsx";
// import { UploadedDocumentsContextProvider } from "./context/UploadedDocumentsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProfileContextProvider>
        <TradingYearProvider>
          <SelfAssessmentContextProvider>
            <FinancialStatementsContextProvider>
              <IDDocumentsContextProvider>
                {/* <UploadedDocumentsContextProvider> */}

                <BrowserRouter>
                  <App />
                  <Toaster />
                </BrowserRouter>
                {/* </UploadedDocumentsContextProvider> */}
              </IDDocumentsContextProvider>
            </FinancialStatementsContextProvider>
          </SelfAssessmentContextProvider>
        </TradingYearProvider>
      </ProfileContextProvider>
    </AuthProvider>
  </StrictMode>
);
