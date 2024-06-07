import React, { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import { LayoutPage, Spinner } from "../../components";

const Settings = lazy(() => import("./Settings/Settings"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const Error404 = lazy(() => import("../errors/Error404/Error404"));
const RequestsArePendingReview = lazy(() => import("./RequestsArePendingReview/RequestsArePendingReview"));
const RequestsAwaitingSecurityApproval = lazy(() => import("./RequestsAwaitingSecurityApproval/RequestsAwaitingSecurityApproval"));
const RequestsAwaitingCompleatPapers = lazy(() => import("./RequestsAwaitingCompleatPapers/RequestsAwaitingCompleatPapers"));
const RequestsAwaitingPaperReview = lazy(() => import("./RequestsAwaitingPaperReview/RequestsAwaitingPaperReview"));
const RequestsAwaitingAllocationDecision = lazy(() => import("./RequestsAwaitingAllocationDecision/RequestsAwaitingAllocationDecision"));
const RequestsCanceled = lazy(() => import("./RequestsCanceled/RequestsCanceled"));
const ManagementAreasAndSections = lazy(() => import("./ManagementAreasAndSections/ManagementAreasAndSections"));
const RequestsAwaitingFirstPayment = lazy(() => import("./RequestsAwaitingFirstPayment/RequestsAwaitingFirstPayment"));

/** @todo convert lazyLoading to external function to use */

export default function DashboardRouter() {
  const location = useLocation();

  return (
    <LayoutPage>
      <Suspense fallback={<Spinner page />}>
        {(() => {
          switch (location.pathname) {
            case "/dashboard":
              return <Dashboard />;
            case "/dashboard/settings":
              return <Settings />;
            case "/dashboard/requests-awaiting-first-payment":
              return <RequestsAwaitingFirstPayment />;
            case "/dashboard/requests-are-pending-review":
              return <RequestsArePendingReview />;
            case "/dashboard/requests-awaiting-security-approval":
              return <RequestsAwaitingSecurityApproval />;
            case "/dashboard/requests-awaiting-compleat-papers":
              return <RequestsAwaitingCompleatPapers />;
            case "/dashboard/requests-awaiting-paper-review":
              return <RequestsAwaitingPaperReview />;
            case "/dashboard/requests-awaiting-allocation-decision":
              return <RequestsAwaitingAllocationDecision   />;
            case "/dashboard/requests-canceled":
              return <RequestsCanceled   />;
            case "/dashboard/management-areas-and-sections":
              return <ManagementAreasAndSections   />;
            default:
              return <Error404 navigateTo={"/dashboard"} timer={10000} />;
          }
        })()}
      </Suspense>
    </LayoutPage>
  );
}
