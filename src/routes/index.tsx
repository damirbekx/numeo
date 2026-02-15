import { Loading } from '@components/common/Loading';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const MainLayout = lazy(() => import('@components/Layout').then(module => ({ default: module.MainLayout })));
const Dashboard = lazy(() => import('@pages/dashboard'));
const Users = lazy(() => import('@pages/users'));
const Help = lazy(() => import('@pages/help'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
