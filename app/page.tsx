import MobileHeader from "@/components/MobileHeader";
import SelectionBar from "@/components/SelectionBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="page-wrapper mt-1">
      <SelectionBar buttons={[
        { buttonText: "Home", route: "/", className: 'flex-1' },
        { buttonText: "Springs", route: "/springs", className: 'flex-1' },
        { buttonText: "Amenities", route: "/amenities", className: 'flex-1' },
        { buttonText: "Donate", route: "/donate", className: 'flex-1' }
      ]} />

  
    </div>

  );
}
