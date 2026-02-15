import type { User } from '@/types/user';
import { Avatar, Drawer, Tag, Typography } from 'antd';
import {
  Briefcase,
  Calendar,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  User as UserIcon,
} from 'lucide-react';
import React, { memo } from 'react';

const { Text, Title, Paragraph } = Typography;

interface UserDetailDrawerProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

const UserDetailDrawer: React.FC<UserDetailDrawerProps> = ({ user, open, onClose }) => {
  if (!user) return null;

  return (
    <Drawer
      title="User Details"
      placement="right"
      onClose={onClose}
      open={open}
      width={500}
      className="custom-drawer"
      styles={{
        header: { borderBottom: '1px solid #f0f0f0' },
        body: { padding: '24px' },
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <Avatar
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.first_name}`}
            size={80}
            className="border-2 border-slate-100 bg-slate-50"
          />
          <div className="flex flex-col gap-1">
            <Title level={4} className="m-0! text-slate-800">
              {user.first_name} {user.last_name}
            </Title>
            <div className="flex items-center gap-2">
              <Tag color="blue">ID: #{user.id}</Tag>
              <Tag color={user.is_active ? 'success' : 'error'}>
                {user.is_active ? 'Active' : 'Inactive'}
              </Tag>
            </div>
          </div>
        </div>

        <div>
          <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">
            Contact Information
          </Text>
          <div className="grid grid-cols-1 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white border border-slate-200 text-blue-500">
                <Mail size={16} />
              </div>
              <div className="flex flex-col">
                <Text type="secondary" className="text-[10px] uppercase font-bold">Email Address</Text>
                <Text strong className="text-slate-700">{user.email}</Text>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white border border-slate-200 text-emerald-500">
                <Phone size={16} />
              </div>
              <div className="flex flex-col">
                <Text type="secondary" className="text-[10px] uppercase font-bold">Phone Number</Text>
                <Text strong className="text-slate-700">{user.phone_number}</Text>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">
            Personal Details
          </Text>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-slate-400">
                <Briefcase size={16} />
              </div>
              <div>
                <Text type="secondary" className="block text-[10px] uppercase font-bold mb-0.5">Occupation</Text>
                <Text strong className="text-slate-700">{user.occupation}</Text>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-slate-400">
                <UserIcon size={16} />
              </div>
              <div>
                <Text type="secondary" className="block text-[10px] uppercase font-bold mb-0.5">Age</Text>
                <Text strong className="text-slate-700">{user.age} years</Text>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-slate-400">
                <Calendar size={16} />
              </div>
              <div>
                <Text type="secondary" className="block text-[10px] uppercase font-bold mb-0.5">Birth Date</Text>
                <Text strong className="text-slate-700">{new Date(user.birth_date).toLocaleDateString()}</Text>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">
            Location
          </Text>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="text-indigo-500">
                <Globe size={16} />
              </div>
              <Text strong className="text-slate-700">{user.city}, {user.country}</Text>
            </div>
            {user.address && (
              <div className="flex items-center gap-3">
                <div className="text-rose-500">
                  <MapPin size={16} />
                </div>
                <Text className="text-slate-600">{user.address}</Text>
              </div>
            )}
          </div>
        </div>

        {user.bio && (
          <div>
            <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">
              About
            </Text>
            <div className="p-4 rounded-xl border border-slate-100 bg-white">
              <Paragraph className="text-slate-600 leading-relaxed mb-0">
                {user.bio}
              </Paragraph>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock size={12} />
            <span>Created: {new Date(user.created_at).toLocaleDateString()}</span>
          </div>
          <div>
            <span>Last Updated: {new Date(user.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default memo(UserDetailDrawer);
