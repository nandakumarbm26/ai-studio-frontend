import { SidebarTrigger } from "@/components/ui/sidebar";

function AppNavbar() {
  return (
    <div className="w-full max-h-[70px] h-[8vh] bg-yellow-100 flex flex-row  items-center px-5 py-2 gap-5 justify-between">
      <div className="flex flex-row gap-5 items-center w-full">
        <SidebarTrigger />
        <div>Home</div>
        <div>Contacts</div>
        <div>Models</div>
      </div>
      <div className="flex flex-row gap-5">
        <div>Avatar</div>
      </div>
    </div>
  );
}

export default AppNavbar;
