

import MobileHeaderServer from "@/components/MobileHeaderServer";
import { getLoggedInUser } from "@/lib/actions/user.action";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
// const user = await getLoggedInUser();
    return (
        <div>
          <MobileHeaderServer />
          {children}
        </div>
      
    
  );
}
