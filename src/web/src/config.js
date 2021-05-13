
export const applicationName = "SFA Client";
export const applicationIcon = "mdi-cash-register";
export const hasSidebar = true;
export const hasSidebarClosable = false;

export const sections = [
    {
        name: "Dashboard",
        url: "/",
        icon: "mdi-view-dashboard"
    },
    {
        name: "Parent Information",
        url: "/parent-information",
        icon: "mdi-account-child"
    },
];
export const environment = process.env.NODE_ENV;
export const apiBaseUrl = process.env.NODE_ENV == "production" ? "" : "http://localhost:3000";
