import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { AppHeader, AppSidebar } from './components';

const { Content } = Layout;

export const MainLayout = () => {
  return (
    <Layout className="h-screen overflow-hidden bg-[#F8FAFC]">
      <AppSidebar />

      <Layout className="h-screen flex flex-col overflow-hidden">
        <AppHeader />

        <Content className="flex-1 overflow-y-auto overflow-x-hidden p-5 scroll-smooth">
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
