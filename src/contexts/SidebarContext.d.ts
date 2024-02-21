
declare module "@/contexts/SidebarContext" {
  export interface SidebarContextValue {
    toggleSidebar: boolean;
    setToggleSidebar: (s: any) => void;
  }
  export const SidebarContext: React.Context<SidebarContextValue>;
}
