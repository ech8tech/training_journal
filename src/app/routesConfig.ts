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
      path: "/journal/:muscleGroupType",
    },
    PROGRESS: {
      path: "/progress/:exerciseId",
    },
    STATISTICS: {
      path: "/statistics",
    },
    COMPONENTS: {
      path: "/components",
    },
  },
};

export const routes = routesConfig.ROUTES;
