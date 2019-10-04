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
            redirect: "/home",
            component: () => import("./components/layout/AppLayout.vue"),
            children: [
                // when /auth/login is matched
                {
                    path: "home",
                    component: () => import("./components/pages/Home.vue")
                },
                {
                    path: "home",
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
                }
            ]
        }
    ]
});

export default router;
