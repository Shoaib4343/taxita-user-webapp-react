import {
  FaDollarSign,
  FaCalendarAlt,
  FaArrowDown,
  FaPercentage,
  FaCar,
  FaChartPie,
  FaFileAlt,
  FaFolderOpen,
  FaUpload,
  FaIdCard,
  FaShoppingCart,
  FaRegCalendarCheck,
} from "react-icons/fa";

const dashboardData = [
  {
    icon: FaDollarSign,
    title: "Income",
    value: "£0.00",
    description: "All your income",
    trend: "up",
    pillText: "0% up",
    path: "/dashboard/income",
  },
  {
    icon: FaCalendarAlt,
    title: "Weekly Income",
    value: "£0.00",
    description: "Weekly income listings",
    trend: "up",
    pillText: "0% up",
     path: "/dashboard/weekly-income",
  },
  {
    icon: FaArrowDown,
    title: "Expenses",
    value: "£0.00",
    description: "All your expenses",
    trend: "down",
    pillText: "0% down",
    path: "/dashboard/expenses",
  },
  {
    icon: FaCalendarAlt,
    title: "Weekly Expenses",
    value: "£0.00",
    description: "Weekly expense listings",
    trend: "up",
    pillText: "0% up",
    path: "/dashboard/weekly-expenses",
  },
  {
    icon: FaPercentage,
    title: "Adjustment",
    value: "0%",
    description: "Income percentage adjustment",
    trend: "up",
    pillText: "0% up",
    path: "/dashboard/percentage-adjustment",
  },
  {
    icon: FaCar,
    title: "Vehicles",
    value: "£0.00",
    description: "All your vehicles",
    trend: "down",
    pillText: "0% down",
    path: "/dashboard/vehicles",
  },
  {
    icon: FaChartPie,
    title: "Profit & Loss",
    value: "£0.00",
    description: "Rolling tax estimate to date",
    trend: "up",
    pillText: "0% up",
    path: '/dashboard/rolling-pl'
  },
  {
    icon: FaFileAlt,
    title: "Self Assessment Returns",
    value: "Pending",
    description: "Estimate of tax to date",
    trend: "down",
    pillText: "0% down",
    path: '/dashboard/self-assessment'
  },
  {
    icon: FaFolderOpen,
    title: "Statements",
    value: "£0.00",
    description: "All your financial statements",
    trend: "down",
    pillText: "0% down",
    path: '/dashboard/financial-statements'
  },
  {
    icon: FaUpload,
    title: "Documents",
    value: "£0.00",
    description: "Your uploaded documents",
    trend: "up",
    pillText: "0% up",
    path: '/dashboard/uploaded-documents'
  },
  {
    icon: FaIdCard,
    title: "ID Verification",
    value: "0",
    description: "Money laundering documents",
    trend: "up",
    pillText: "0% up",
    path: '/dashboard/id-documents'
  },
  {
    icon: FaShoppingCart,
    title: "Buy / Renew Plan",
    value: "From £0/yr",
    description: "Buy or renew your Taxita plan",
    trend: "down",
    pillText: "0% down",
    path: '/dashboard/buy-renew-plan'
  },
  {
    icon: FaRegCalendarCheck,
    title: "Tax Year",
    value: "2025/2026",
    description: "Finalise this year’s tax filing",
    trend: "up",
    pillText: "Tax open",
    path: '/dashboard/tax-year'
  },
];

export default dashboardData;
