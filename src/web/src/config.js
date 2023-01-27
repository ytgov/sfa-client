
export const applicationName = "SFA Admin";
export const applicationIcon = "mdi-cash-register";
export const hasSidebar = true;
export const hasSidebarClosable = false;

export const sections = [
   /*  {
        name: "Dashboard",
        url: "/",
        icon: "mdi-view-dashboard"
    }, */
    /* {
        name: "Student Basics",
        url: "/application/1234/personal",
        icon: "mdi-school",
        makeUrl: function(id) { return `/application/${id}/personal` }
    }, */
    {
        name: "Application Basics",
        icon: "mdi-clipboard-text",
        makeUrl: function(id) { return `/application/${id}/personal` }
    },
    {
        name: "Assessment & Status",
        icon: "mdi-clipboard-check-outline",
        makeUrl: function(id) { return `/application/${id}/status` }
    },
    {
        name: "Academic Year",
        icon: "mdi-school",
        makeUrl: function(id) { return `/application/${id}/academic-year` }
    },
    {
        name: "SFA Funding Requests",
        icon: "mdi-currency-usd",
        makeUrl: function(id) { return `/application/${id}/sfa-funding-requests` }
    },
    {
        name: "Scholarship Applications",
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
        icon: "mdi-bookshelf",
        makeUrl: function(id) { return `/application/${id}/documentation` }
    },
];
export const environment = process.env.NODE_ENV;
export const apiBaseUrl = (process.env.NODE_ENV == "test" || process.env.NODE_ENV == "production") ? "" : "http://35.93.91.213:3000";
