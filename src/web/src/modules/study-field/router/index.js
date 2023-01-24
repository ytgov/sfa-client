
export default [

    {
        path: "/administration/study-field",
        name: "AdminStudyField",
        component: () => { return import("../views/StudyFieldMain.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




