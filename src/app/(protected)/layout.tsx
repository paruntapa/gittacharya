import { SidebarProvider } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { AppSidebar } from "./app-sidebar";

type Props = {
  children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar/>

      <main className="m-2 w-full gap-4">
        <div className="flex items-center gap-2 rounded-md border-sidebar-border bg-sidebar p-2 px-4 shadow">
          {/* SearchBar */}
          <div className="ml-auto">
            <UserButton />
          </div>
        </div>
        <div className="h-4" />
          {/* main-content */}
          <div className="h-[calc(100vh-6rem)] overflow-y-scroll rounded-md border-sidebar-border bg-sidebar p-4 shadow">
            {children}
          </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
