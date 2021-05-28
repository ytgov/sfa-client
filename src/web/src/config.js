
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
        url: "/application/1234/personal",
        icon: "mdi-account"
    },
    {
        name: "Assessment & Status",
        url: "/application/1234/status",
        icon: "mdi-account"
    },
    {
        name: "Academic Year",
        url: "/application/1234/academic-year",
        icon: "mdi-school"
    },
    {
        name: "Other Agencies Funding",
        url: "/application/1234/other-agencies-funding",
        icon: "mdi-currency-usd"
    },
    {
        name: "SFA Funding Requests",
        url: "/application/1234/sfa-funding-requests",
        icon: "mdi-currency-usd"
    },
    {
        name: "Education History",
        url: "/application/1234/education-history",
        icon: "mdi-school"
    },
    {
        name: "Student Dependents",
        url: "/application/1234/student-dependents",
        icon: "mdi-baby"
    },
    {
        name: "Scholarship Applications",
        url: "/application/1234/scholarship-applications",
        icon: "mdi-baby"
    },
    {
        name: "CSL Funding Requests",
        url: "/application/1234/csl-funding-requests",
        icon: "mdi-baby"
    },
    {
        name: "Accommodation",
        url: "/application/1234/accommodation",
        icon: "mdi-baby"
    },
    {
        name: "Expenses",
        url: "/application/1234/expenses",
        icon: "mdi-baby"
    },
    {
        name: "Income",
        url: "/application/1234/income",
        icon: "mdi-baby"
    },
    {
        name: "Parent Information",
        url: "/application/1234/parent-information",
        icon: "mdi-account-child"
    },
    {
        name: "Spouse",
        url: "/application/1234/spouse",
        icon: "mdi-baby"
    },
    {
        name: "Documentation",
        url: "/application/1234/documentation",
        icon: "mdi-account-child"
    },
];
export const environment = process.env.NODE_ENV;
export const apiBaseUrl = process.env.NODE_ENV == "production" ? "" : "http://localhost:3000";
