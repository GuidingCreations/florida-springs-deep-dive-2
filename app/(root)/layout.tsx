
import MobileHeader from "@/components/MobileHeader";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div>
          <MobileHeader />
          {children}
        </div>
      
    
  );
}
