'use client'

import { selectionBarProps } from "@/types";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from "./ui/button";
import SelectionButton from "./SelectionButton";

const SelectionBar = ({ buttons }: selectionBarProps) => {

    const pathname = usePathname();

  return (
    <div className="horizontal-container mt-1">
      {buttons.map((button) => {

        
        return (
                <SelectionButton buttonText={button.buttonText} route={button.route} key={button.route} className={button.className? button.className : ''}/>
        );
      }
        )
        }
    </div>
  );
};

export default SelectionBar;
