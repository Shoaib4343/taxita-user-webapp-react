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
import { WeeklyIncomeProvider } from "./context/WeeklyIncomeContext.jsx";
import { AccountsProvider } from "./context/AccountsContext.jsx";
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
                <WeeklyIncomeProvider>
                  <AccountsProvider>
                    <BrowserRouter>
                      <App />
                      <Toaster />
                    </BrowserRouter>
                  </AccountsProvider>
                </WeeklyIncomeProvider>
                {/* </UploadedDocumentsContextProvider> */}
              </IDDocumentsContextProvider>
            </FinancialStatementsContextProvider>
          </SelfAssessmentContextProvider>
        </TradingYearProvider>
      </ProfileContextProvider>
    </AuthProvider>
  </StrictMode>
);
