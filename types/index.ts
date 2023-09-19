import { MouseEventHandler } from 'react'

export interface CustomButtonProps {
    // isDisable?: boolean;
    btnType?: "button" | "submit";
    containerStyles?: string;
    // textStyles?: string;
    title: string;
    // rightIcon?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>
}

export interface SearchManufectererProps {
    manufecterer: string;
    setManufecterer: (manufecterer: string) => void;
}