
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
        icon: "mdi-clipboard-check-outline"
    },
    {
        name: "Academic Year",
        url: "/application/1234/academic-year",
        icon: "mdi-school"
    },
    {
        name: "SFA Funding Requests",
        url: "/application/1234/sfa-funding-requests",
        icon: "mdi-currency-usd"
    },
    {
        name: "Scholarship Applications",
        url: "/application/1234/scholarship-applications",
        icon: "mdi-book"
    },
    {
        name: "CSL Funding Requests",
        url: "/application/1234/csl-funding-requests",
        icon: "mdi-account-cash"
    },
    {
        name: "Documentation",
        url: "/application/1234/documentation",
        icon: "mdi-bookshelf"
    },
];
export const environment = process.env.NODE_ENV;
export const apiBaseUrl = process.env.NODE_ENV == "production" ? "" : "http://localhost:3000";
