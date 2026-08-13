import { createRoute } from "@tanstack/react-router";
import { DataLakehouse } from "../../pages/SolutionsPage/DataLakehouse";
import { rootRoute } from "../__root";

export const dataLakehouseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/solutions/data-lakehouse",
  component: function DataLakehousePage() {
    return <DataLakehouse />;
  },
});
