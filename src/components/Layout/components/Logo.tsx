import { useLayoutStore } from "@shared/stores";

export const Logo = () => {
  const collapsed = useLayoutStore((state) => state.collapsed);

  return (
    <div className={`h-16 flex items-center transition-all duration-300 ${collapsed ? 'justify-center px-0' : 'px-6'}`}>
      <div className="flex items-center">
        {!collapsed ? (
          <span className="font-['Outfit'] font-black text-xl tracking-[0.2em] text-white uppercase">
            Dashboard
          </span>
        ) : (
          <span className="font-['Outfit'] font-black text-xl text-white">D</span>
        )}
      </div>
    </div>
  );
};
