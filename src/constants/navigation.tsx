import type { MenuProps } from 'antd';
import { HelpCircle, LayoutDashboard, Users } from 'lucide-react';

export const MENU_ITEMS: MenuProps['items'] = [
  {
    key: '/',
    icon: <LayoutDashboard size={20} />,
    label: 'Dashboard',
  },
  {
    key: '/users',
    icon: <Users size={20} />,
    label: 'Users',
  },
  {
    type: 'divider' as const,
    style: { margin: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.05)' }
  },
  {
    key: '/help',
    icon: <HelpCircle size={20} />,
    label: 'Documentation',
  },
];
