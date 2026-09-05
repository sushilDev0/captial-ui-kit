import type { InputHTMLAttributes } from 'react';

export interface DebouncedSearchProps 
extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> { 

    onSearch: (value:string)=> void;
    delay?:number;
    isLoading?:boolean;
    enableShortcut?:boolean;
    
}