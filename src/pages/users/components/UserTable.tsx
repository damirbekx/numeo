import { EmptyState } from '@/components/common/EmptyState';
import type { User } from '@/types/user';
import { Avatar, Pagination, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Briefcase, Calendar, Globe, Mail, MapPin, Phone, ShieldAlert, ShieldCheck } from 'lucide-react';
import React, { memo } from 'react';

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  onRowClick: (user: User) => void;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
}

const UserTable: React.FC<UserTableProps> = ({ users, isLoading, onRowClick, pagination }) => {
  const columns: ColumnsType<User> = [
    {
      title: 'Profile Identity',
      key: 'user',
      width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${record.first_name}`}
              className="bg-slate-100 shrink-0 border border-slate-100"
              size={40}
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${record.is_active ? 'bg-emerald-500' : 'bg-slate-300'}`}>
              {record.is_active ? <ShieldCheck size={8} className="text-white" /> : <ShieldAlert size={8} className="text-white" />}
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-slate-800 truncate leading-tight tracking-tight">
              {record.first_name} {record.last_name}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
              #{record.id} • {record.age}y
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Security & Contact',
      key: 'contact',
      width: 250,
      render: (_, record) => (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-slate-600">
            <Mail size={12} className="text-blue-500" />
            <span className="text-xs font-semibold truncate">{record.email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Phone size={12} />
            <span className="text-[10px] font-bold tracking-tight truncate">{record.phone_number}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Role & Portfolio',
      key: 'role',
      width: 250,
      render: (_, record) => (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Briefcase size={12} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-700 truncate capitalize">{record.occupation}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar size={12} className="text-blue-400" />
            <span className="text-[10px] font-bold truncate">Born: {new Date(record.birth_date).toLocaleDateString()}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Regional Sector',
      key: 'location',
      width: 200,
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Globe size={11} className="text-blue-400" />
            <span className="text-xs font-bold text-slate-700 truncate">{record.country}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <MapPin size={11} className="text-rose-400" />
            <span className="text-[10px] font-bold truncate">{record.city}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 130,
      render: (_, record) => (
        <div className="flex items-center">
          {record.is_active ? (
            <div className="relative px-5 py-2.5 bg-slate-50/50 rounded-xl border border-slate-100 min-w-[90px] flex! items-center! justify-center group pointer-events-none">
              <div className="absolute top-1.5 left-2 translate-y-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] ml-1">Active</span>
            </div>
          ) : (
            <div className="relative px-5 py-2.5 bg-slate-50/30 rounded-xl border border-slate-100 min-w-[90px] flex items-center justify-center opacity-60 pointer-events-none">
              <div className="absolute top-1.5 left-2 translate-y-1.5 w-2 h-2 bg-red-300 rounded-full" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Inactive</span>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="ant-table-premium flex flex-col h-full overflow-hidden">
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={isLoading}
        pagination={false}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
          className: 'cursor-pointer hover:bg-slate-50/50 transition-colors'
        })}
        scroll={{ y: 'calc(100vh - 360px)', x: users.length > 0 ? 1000 : undefined }}
        className="flex-1"
        size="middle"
        locale={{
          emptyText: (
            <EmptyState
              title="No Users"
              description="It seems like our database is empty or no users match your current filter criteria."
            />
          )
        }}
      />

      <div className="px-10 py-5 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page Capacity</span>
            <Select
              className="w-24 custom-select-minimal"
              variant="outlined"
              value={pagination.pageSize}
              onChange={(val) => pagination.onChange(1, val)}
              options={[
                { value: 10, label: '10' },
                { value: 20, label: '20' },
                { value: 50, label: '50' },
                { value: 100, label: '100' },
              ]}
            />
          </div>
          <div className="h-4 w-px bg-slate-100" />
        </div>

        <Pagination
          {...pagination}
          showSizeChanger={false}
          className="custom-pagination-minimal"
        />
      </div>
    </div>
  );
};

export default memo(UserTable);
