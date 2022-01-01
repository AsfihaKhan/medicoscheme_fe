import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../pages/Home";

Vue.use(VueRouter);
/* eslint-disable */
const routes = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "blank" },
    component: Home,
  },
  {
    path: "/register",
    name: "Registration",
    meta: { layout: "blank" },
    component: () => import("../pages/AuthRegistration"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { layout: "blank" },
    component: () => import("../pages/AuthLogin"),
  },
  {
    path: "/blogs",
    name: "Blogs",
    meta: { layout: "blank" },
    component: () => import("../pages/BlogList"),
  },
  {
    path: "/blogs/:id",
    name: "Read Blog",
    meta: { layout: "blank" },
    component: () => import("../pages/SingleBlogPage"),
  },

  // admin routes
  {
    path: "/admin/dashboard",
    name: "Admin Dashboard",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/admin/AdminDashboard"),
  },
  {
    path: "/admin/doctor-list",
    name: "Doctors",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/admin/DoctorList"),
  },
  {
    path: "/admin/doctor/:id",
    name: "Doctor Details",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/admin/DoctorDetails"),
  },
  {
    path: "/admin/patient-list",
    name: "Patients",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/admin/PatientList"),
  },
  {
    path: "/admin/lab-list",
    name: "Labs",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/admin/LabList"),
  },
  {
    path: "/admin/lab/:id",
    name: "Lab Details",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/admin/LabDetails"),
  },
  // patient routes
  {
    path: "/patient/dashboard",
    name: "User Dashboard",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/patient/Dashboard"),
  },
  {
    path: "/patient/doctor-list",
    name: "Find Doctor",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/patient/DoctorList"),
  },
  {
    path: "/patient/doctor-list/:id",
    name: "Doctor Details",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/patient/DoctorDetailsInformation"),
  },
  {
    path: "/patient/appointed-doctors",
    name: "Appointed Doctors",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/patient/AppointedDoctors"),
  },
  {
    path: "/patient/booked-doctors",
    name: "Booked Doctors",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/patient/BookedDoctors"),
  },
  {
    path: "/patient/lab-list",
    name: "Find Lab",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/patient/LabList"),
  },
  {
    path: "/patient/lab-list/:id",
    name: "Lab Details",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/patient/LabDetailsInformation"),
  },
  {
    path: "/patient/booked-labs",
    name: "Booked Labs",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/patient/BookedLabs"),
  },
  {
    path: "/patient/blogs",
    name: "Blog List",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/patient/Blogs"),
  },
  {
    path: "/patient/blogs/:id",
    name: "Blog Details",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/patient/SingleBlog"),
  },
  {
    path: "/patient/notification",
    name: "Patient Notification",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/patient/Notification"),
  },
  {
    path: "/patient/profile",
    name: "My Profile",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/patient/Profile"),
  },
  // doctor routes
  {
    path: "/doctor/dashboard",
    name: "My Dashboard",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/doctor/Dashboard"),
  },
  {
    path: "/doctor/patient-list",
    name: "My Patients",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/doctor/PatientList"),
  },
  {
    path: "/doctor/write-blog",
    name: "Write Blog",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/doctor/WriteBlog"),
  },
  {
    path: "/doctor/view-blogs",
    name: "View Blogs",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/doctor/ViewBlogs"),
  },
  {
    path: "/doctor/edit-blog/:id",
    name: "Edit Blog",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/doctor/EditBlog"),
  },
  {
    path: "/doctor/notification",
    name: "Doctor Notification",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/doctor/Notification"),
  },
  {
    path: "/doctor/profile",
    name: "Profile",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/doctor/Profile"),
  },
  // lab admin routes
  {
    path: "/lab/dashboard",
    name: "Dashboard",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/lab-admin/Dashboard"),
  },
  {
    path: "/lab/pending-patient-list",
    name: "Patient List",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/lab-admin/PatientList"),
  },
  {
    path: "/lab/provided-services",
    name: "Patient List",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/lab-admin/ProvidedServices"),
  },
  {
    path: "/lab/add-report/haematology/:id",
    name: "Hematology Report",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/lab-admin/create/Hematology"),
  },
  {
    path: "/lab/add-report/dengue/:id",
    name: "Dengue Report",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/lab-admin/create/Dengue"),
  },
  {
    path: "/lab/add-report/pathology/:id",
    name: "Pathology Report",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/lab-admin/create/Pathology"),
  },
  {
    path: "/lab/add-report/image-upload/:id",
    name: "Upload",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/lab-admin/create/ImageUpload"),
  },
  {
    path: "/lab/view-report/image/:id",
    name: "Image Report",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/lab-admin/view/ImageReport"),
  },
  {
    path: "/lab/view-report/haematology/:id",
    name: "Haematology Report",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/lab-admin/view/HaematologyReport"),
  },
  {
    path: "/lab/view-report/pathology/:id",
    name: "Pathology Report",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/lab-admin/view/PathologyReport"),
  },
  {
    path: "/lab/view-report/dengue/:id",
    name: "Dengue Report",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/lab-admin/view/DengueReport"),
  },
  {
    path: "/lab/notification",
    name: "Lab Notification",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/lab-admin/Notification"),
  },
  {
    path: "/lab/profile",
    name: "Lab Profile",
    beforeEnter: protectedRoutes,
    component: () => import("../pages/lab-admin/Profile"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
  next();
});

// code to check authentication of the users

function protectedRoutes(to, from, next) {
  if (!store.state.auth.isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
}

export default router;
