
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
        icon: "mdi-account",
        makeUrl: function(id) { return `/application/${id}/personal` }
    },
    {
        name: "Assessment & Status",
        url: "/application/1234/status",
        icon: "mdi-clipboard-check-outline",
        makeUrl: function(id) { return `/application/${id}/status` }
    },
    {
        name: "Academic Year",
        url: "/application/1234/acdeamic-year",
        icon: "mdi-school",
        makeUrl: function(id) { return `/application/${id}/academic-year` }
    },
    {
        name: "SFA Funding Requests",
        url: "/application/1234/sfa-funding-requests",
        icon: "mdi-currency-usd",
        makeUrl: function(id) { return `/application/${id}/sfa-funding-requests` }
    },
    {
        name: "Scholarship Applications",
        url: "/application/1234/scholarship-applications",
        icon: "mdi-book",
        makeUrl: function(id) { return `/application/${id}/scholarship-applications` }
    },
    {
        name: "CSL Funding Requests",
        url: "/application/1234/csl-funding-requests",
        icon: "mdi-account-cash",
        makeUrl: function(id) { return `/application/${id}/csl-funding-requests` }
    },
    {
        name: "Documentation",
        url: "/application/1234/documentation",
        icon: "mdi-bookshelf",
        makeUrl: function(id) { return `/application/${id}/documentation` }
    },
];
export const environment = process.env.NODE_ENV;
export const apiBaseUrl = process.env.NODE_ENV == "production" ? "" : "http://localhost:3000";
