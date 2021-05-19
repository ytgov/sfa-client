
export const applicationName = "SFA Client";
export const applicationIcon = "mdi-cash-register";
export const hasSidebar = true;
export const hasSidebarClosable = false;

export const sections = [
   /*  {
        name: "Dashboard",
        url: "/",
        icon: "mdi-view-dashboard"
    }, */
    {
        name: "Personal",
        url: "/personal",
        icon: "mdi-account"
    },
    {
        name: "Assessment & Status",
        url: "/status",
        icon: "mdi-account"
    },
    {
        name: "Residence History",
        url: "/residence-history",
        icon: "mdi-home"
    },
    {
        name: "Academic Year",
        url: "/academic-year",
        icon: "mdi-school"
    },
    {
        name: "Other Agencies Funding",
        url: "/other-agencies-funding",
        icon: "mdi-currency-usd"
    },
    {
        name: "SFA Funding Requests",
        url: "/sfa-funding-requests",
        icon: "mdi-currency-usd"
    },
    {
        name: "Education History",
        url: "/education-history",
        icon: "mdi-school"
    },
    {
        name: "Student Dependents",
        url: "/student-dependents",
        icon: "mdi-baby"
    },
    {
        name: "Scholarship Applications",
        url: "/scholarship-applications",
        icon: "mdi-baby"
    },
    {
        name: "CSL Funding Requests",
        url: "/csl-funding-requests",
        icon: "mdi-baby"
    },
    {
        name: "Accommodation",
        url: "/accommodation",
        icon: "mdi-baby"
    },
    {
        name: "Expenses",
        url: "/expenses",
        icon: "mdi-baby"
    },
    {
        name: "Income",
        url: "/income",
        icon: "mdi-baby"
    },
    {
        name: "Parent Information",
        url: "/parent-information",
        icon: "mdi-account-child"
    },
    {
        name: "Spouse",
        url: "/spouse",
        icon: "mdi-baby"
    },
    {
        name: "Documentation",
        url: "/documentation",
        icon: "mdi-account-child"
    },
];
export const environment = process.env.NODE_ENV;
export const apiBaseUrl = process.env.NODE_ENV == "production" ? "" : "http://localhost:3000";
