import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { Avatar, Button, Layout } from 'antd';

const { Header: AntHeader } = Layout;

import { useLayoutStore } from "@shared/stores";

export const AppHeader = () => {
  const { collapsed, toggleCollapsed } = useLayoutStore();
  return (
    <AntHeader className="h-16 px-5! bg-[#0f172a] shrink-0 z-20 flex items-center justify-between border-b border-white/5">
      <div className="flex items-center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
          className="text-slate-400! hover:text-white! flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 transition-all shadow-none border-none"
        />
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-2.5 px-2.5 h-10 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all group">
          <div className="text-right hidden sm:flex flex-col leading-none">
            <div className="text-[11px] font-bold text-white group-hover:text-blue-400 transition-colors">Damirbek</div>
            <div className="text-[8px] text-slate-500 uppercase font-black tracking-widest opacity-60 mt-0.5">Admin</div>
          </div>
          <div className="relative group-hover:scale-105 transition-transform duration-300 flex items-center">
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              className="border border-white/10 shadow-lg"
              size={24}
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 border border-[#0f172a] rounded-full shadow-lg" />
          </div>
        </div>
      </div>
    </AntHeader>
  );
};
