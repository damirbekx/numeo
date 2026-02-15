import { Alert, Divider } from 'antd';
import React from 'react';
import UserDetailDrawer from './components/UserDetailDrawer';
import UserFiltersView from './components/UserFilters';
import UserTable from './components/UserTable';
import { useUsers } from './hooks/useUsers';

const Users: React.FC = () => {
  const {
    data,
    isFetching,
    status,
    error,
    filters,
    selectedUser,
    isDrawerOpen,
    handleFilterChange,
    handleRowClick,
    closeDrawer,
  } = useUsers();

  return (
    <div className="space-y-6 h-full flex flex-col overflow-hidden">
      <div className="bg-white rounded-xl border border-slate-200/50 overflow-hidden flex flex-col flex-1 min-h-0 shadow-sm relative z-0">
        <UserFiltersView filters={filters} onFilterChange={handleFilterChange} />

        <Divider className="m-0! border-slate-100" />

        <div className="flex-1 min-h-0">
          {status === 'error' && (
            <div className="p-6">
              <Alert
                message={<span className="font-bold">Protocol Conflict Detected</span>}
                description={error instanceof Error ? error.message : 'The API stream was interrupted by a remote peer.'}
                type="error"
                showIcon
                className="rounded-2xl border-none bg-red-50 text-red-800 shadow-sm"
              />
            </div>
          )}

          <UserTable
            users={data?.results || []}
            isLoading={status === 'pending' || isFetching}
            onRowClick={handleRowClick}
            pagination={{
              current: filters.page || 1,
              pageSize: filters.page_size || 20,
              total: data?.count || 0,
              onChange: (page, pageSize) => handleFilterChange({ page, page_size: pageSize }),
            }}
          />
        </div>
      </div>

      <UserDetailDrawer
        user={selectedUser}
        open={isDrawerOpen}
        onClose={closeDrawer}
      />
    </div>
  );
};

export default Users;
