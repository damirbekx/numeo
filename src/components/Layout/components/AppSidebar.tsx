import { MENU_ITEMS } from '@constants/navigation';
import { useLayoutStore } from "@shared/stores";
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';

const { Sider } = Layout;

export const AppSidebar = () => {
  const collapsed = useLayoutStore((state) => state.collapsed);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="dark"
      width={260}
      collapsedWidth={80}
      className="h-screen bg-[#0f172a] relative z-30"
    >
      <Logo />

      <div className="px-3 mt-2">
        <Menu
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          className="border-none bg-transparent"
          items={MENU_ITEMS?.map((item) => {
            if (!item || ('type' in item && item.type === 'divider')) return item;

            const isSelected = 'key' in item && item.key === location.pathname;

            return {
              ...item,
              className: `rounded-xl mb-1 flex items-center font-semibold !transition-all !duration-300 ${collapsed
                ? '!w-11 !h-11 !p-0 justify-center mx-auto my-1'
                : 'px-4'
                } ${isSelected
                  ? '!bg-blue-600/10 !text-blue-400'
                  : '!text-slate-400 hover:!text-white hover:!bg-white/5'
                }`
            };
          })}
        />
      </div>
    </Sider>
  );
};
