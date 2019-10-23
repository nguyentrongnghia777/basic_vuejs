import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history", // remove #
    routes: [
        {
            path: "/auth",
            component: () => import("./components/layout/LoginLayout.vue"),
            children: [
                // when /auth/login is matched
                {
                    path: "login",
                    component: () => import("./components/pages/Login.vue")
                }
            ]
        },
        {
            path: "/",
            component: () => import("./components/layout/AppLayout.vue"),
            children: [
                // when /auth/login is matched
                {
                    path: "",
                    component: () => import("./components/pages/Home.vue")
                },
                {
                    path: "users",
                    component: () => import("./components/pages/Users.vue")
                },
                {
                    path: "users/:id",
                    component: () => import("./components/pages/User.vue")
                },
                {
                    path: "products",
                    component: () =>
                        import("./components/pages/Product/List.vue")
                },
                {
                    path: "products/:id",
                    component: () =>
                        import("./components/pages/Product/Detail.vue")
                },
                {
                    path: "demo",
                    component: () =>
                        import("./components/pages/Demo/EmitDashboard.vue")
                },
                {
                    path: "demo/vif",
                    component: () =>
                        import("./components/pages/Demo/Vif.vue")
                },
                {
                    path: "article",
                    component: () => import("./components/pages/Article/List.vue")
                },
                {
                    path: "article/create",
                    component: () => import("./components/pages/Article/Create.vue")
                },
                {
                    path: "*",
                    component: () => import("./components/pages/NotFound.vue")
                }
            ]
        },
    ]
});

export default router;
