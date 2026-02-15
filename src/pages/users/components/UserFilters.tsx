import type { UserFilters } from '@/types/user';
import { Badge, Button, Input, InputNumber, Popover, Select, Tooltip } from 'antd';
import debounce from 'lodash/debounce';
import { ChevronDown, ListFilter, RotateCcw, Search, SlidersHorizontal, UserCheck } from 'lucide-react';
import React from 'react';
import { useCountries } from '../hooks/useUsers';

interface UserFiltersViewProps {
  filters: UserFilters;
  onFilterChange: (filters: Partial<UserFilters>) => void;
}

const UserFiltersView: React.FC<UserFiltersViewProps> = ({ filters, onFilterChange }) => {
  const { data: countries, isLoading: isCountriesLoading } = useCountries();

  const debouncedSearch = debounce((value: string) => {
    onFilterChange({ search: value, page: 1 });
  }, 500);

  const [tempAge, setTempAge] = React.useState<number | undefined>(filters.age);
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  React.useEffect(() => {
    setTempAge(filters.age);
  }, [filters.age]);

  const handleApplyAge = () => {
    onFilterChange({ age: tempAge, page: 1 });
    setPopoverOpen(false);
  };

  const hasActiveFilters = React.useMemo(() => {
    return !!(filters.age || filters.country || filters.is_active !== undefined || filters.search);
  }, [filters]);

  const handleResetFilters = () => {
    onFilterChange({
      search: '',
      age: undefined,
      country: undefined,
      is_active: undefined,
      page: 1,
    });
    setTempAge(undefined);
  };

  const agePopoverContent = (
    <div className="p-3">
      <div className="mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        Filter by Age
      </div>
      <div className="flex items-center gap-2">
        <InputNumber
          placeholder="Age"
          className="w-20 rounded-xl! border-transparent hover:border-blue-400 focus:border-blue-500 bg-slate-50/50 font-bold text-slate-700 h-10 flex items-center"
          value={tempAge}
          onChange={(value) => setTempAge(value || undefined)}
          min={1}
          max={120}
          onPressEnter={handleApplyAge}
          controls={false}
          precision={0}
          inputMode="numeric"
          onKeyDown={(e) => {
            if (
              !/[0-9]/.test(e.key) &&
              !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)
            ) {
              e.preventDefault();
            }
          }}
        />
        <Button
          type="primary"
          className="h-10! px-4! rounded-xl! bg-blue-600 font-bold text-[10px] uppercase tracking-widest border-none hover:bg-blue-700 shadow-sm"
          onClick={handleApplyAge}
        >
          Apply
        </Button>
      </div>
    </div>
  );

  return (
    <div className="bg-white px-10 py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shrink-0">
      <div className="relative flex-1 group">
        <Input
          prefix={<Search className="text-slate-300 group-focus-within:text-blue-500 transition-colors mr-3" size={20} />}
          defaultValue={filters.search}
          placeholder="Query encrypted records by identity, email or protocol..."
          suffix={
            <div className="flex items-center gap-2">
              <Popover
                content={agePopoverContent}
                trigger="click"
                placement="bottomRight"
                open={popoverOpen}
                onOpenChange={setPopoverOpen}
              >
                <Badge count={filters.age} overflowCount={120} offset={[-5, 5]}>
                  <Button
                    className={`h-10! w-10! p-0! rounded-xl! border-none! flex items-center justify-center shadow-sm transition-all ${filters.age ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100' : 'bg-white text-slate-400 hover:bg-slate-50'}`}
                    icon={<SlidersHorizontal size={18} />}
                  />
                </Badge>
              </Popover>
            </div>
          }
          className="w-full h-14 px-6 bg-slate-50/80 border-slate-100! hover:border-blue-400! rounded-[1.5rem]! text-[15px] font-medium focus-within:border-blue-500! focus-within:bg-white shadow-none! transition-all [&>input]:placeholder:text-slate-400 [&>input]:text-slate-700 [&>input]:bg-transparent"
          onChange={(e) => debouncedSearch(e.target.value)}
          allowClear
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-50/80 p-2 rounded-[1.5rem] border border-slate-100">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200/40 text-slate-500">
            <ListFilter size={18} className="text-blue-500" />
            <span className="text-[11px] font-black uppercase tracking-wider">Region</span>
          </div>
          <Select
            showSearch
            loading={isCountriesLoading}
            placeholder="Select Country"
            className="w-48 custom-select-minimal"
            variant="borderless"
            allowClear
            value={filters.country}
            suffixIcon={<ChevronDown size={16} className="text-slate-400" />}
            onChange={(value) => onFilterChange({ country: value, page: 1 })}
            options={countries?.map(c => ({ value: c, label: c }))}
          />
        </div>

        <div className="flex items-center gap-2 bg-slate-50/80 p-2 rounded-[1.5rem] border border-slate-100">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200/40 text-slate-500">
            <UserCheck size={18} className="text-blue-500" />
            <span className="text-[11px] font-black uppercase tracking-wider">Status</span>
          </div>
          <Select
            placeholder="All Status"
            className="w-32 custom-select-minimal"
            variant="borderless"
            allowClear
            value={filters.is_active}
            suffixIcon={<ChevronDown size={16} className="text-slate-400" />}
            onChange={(value) => onFilterChange({ is_active: value, page: 1 })}
            options={[
              { value: true, label: 'Active' },
              { value: false, label: 'Inactive' },
            ]}
          />
        </div>

        {hasActiveFilters && (
          <Tooltip title="Reset Filters">
            <Button
              icon={<RotateCcw size={18} />}
              onClick={handleResetFilters}
              className="h-12! w-12! rounded-[1.5rem]! border-red-100! text-red-500! hover:bg-red-50! hover:border-red-200! flex items-center justify-center transition-all duration-300"
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default React.memo(UserFiltersView);
