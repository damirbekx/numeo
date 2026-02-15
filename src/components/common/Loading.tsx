import { Spin } from 'antd';

export const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <Spin size="large" />
    </div>
  );
};
