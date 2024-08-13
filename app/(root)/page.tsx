import MobileHeader from "@/components/MobileHeader";
import SelectionBar from "@/components/SelectionBar";
import Image from "next/image";
import { getLoggedInUser } from "@/lib/actions/user.action";

export default function Home() {

const loggedInUser = getLoggedInUser();

  return (
    <div className="page-wrapper mt-3">
      <SelectionBar buttons={[
        { buttonText: "Home", route: "/", className: 'flex-1' },
        { buttonText: "Springs", route: "/springs", className: 'flex-1' },
        { buttonText: "Amenities", route: "/amenities", className: 'flex-1' },
        { buttonText: "Donate", route: "/donate", className: 'flex-1' }
      ]} />

      
      <section>
        <div className="mt-3 flex gap-">
          <h1 className="text-theme-primary">Dive in &nbsp;</h1><h1>to Florida springs</h1>
        </div>

        <div className="mt-1">
          <Image src="/icons/alexanderImage.svg" alt="spring" width={400} height={300} />
          <p className="mt-1">Florida has hundreds of freshwater springs, each of them unique. The combination of sun, water, and wildlife can make for some truly enriching experiences, and memories that are sure to last a lifetime.</p>
        </div>
      </section>

      <section>
        <div className="mt-3 flex gap-">
          <h1>Amenities</h1>
        </div>

        <div className="mt-1">
          <Image src="/icons/amenities-image.png" alt="spring" width={400} height={300} />
          <p className="mt-1">Amenities vary spring by spring, and can include things such as kayaking, hiking, and diving. Some springs are famous for particular amenities that you truly can’t get anywhere else </p>
        </div>
      </section>


      <section>
        <div className="mt-3 flex gap-">
          <h1>Wildlife</h1>
        </div>

        <div className="mt-1">
          <Image src="/icons/wildlife-image.png" alt="spring" width={400} height={300} />
          <p className="mt-1">Most springs are teeming with wildlife. If you visit enough springs, you’re sure to see everything from manatees to river otters to armadillos. Most animals in the springs don’t like lots of noise, so get there before the crowds scare them away!</p>
        </div>
      </section>


  
    </div>

  );
}
