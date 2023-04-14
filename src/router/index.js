import { createWebHistory, createRouter } from "vue-router";
import App from "@/App.vue";
import Manage from "@/views/manage.vue";

const routes = [
	{
		path: "/",
		name: "App",
		component: App,
	},
	{
		path: "/manage",
		name: "Manage",
		component: Manage,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
