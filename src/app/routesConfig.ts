const routesConfig = {
  ROUTES: {
    DASHBOARD: {
      path: "/dashboard",
    },
    AUTHENTICATION: {
      path: "/authentication",
      SIGN_IN: {
        path: "/sign_in",
      },
      SIGN_UP: {
        path: "/sign_up",
      },
    },
    PROFILE: {
      path: "/profile",
    },
    JOURNAL: {
      path: "/journal",
    },
    COMPONENTS: {
      path: "/components",
    },
  },
};

export const routes = routesConfig.ROUTES;
