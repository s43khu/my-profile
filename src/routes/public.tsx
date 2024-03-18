import { lazyImport } from "@/lib/lazyImport";

const { PublicRoutes } = lazyImport(() => import('@/features/Public'), 'PublicRoutes');

export const publicRoutes = [
  // {
  //   path: "/auth/*",
  //   element: <AuthRoutes />,
  // },
  {
    path: '/',
    element:<PublicRoutes/>
  }
];
