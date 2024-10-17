declare module '@radix-ui/react-icons' {
    export const CaretSortIcon: React.FC<React.SVGProps<SVGSVGElement>>;
    export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>>;
    export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>>;
    export const ChevronUpIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  }
  



  declare module '@radix-ui/react-select' {
    import * as React from 'react';
  
    export const Root: React.FC<React.ComponentProps<'div'>>;
    export const Trigger: React.FC<React.ComponentProps<'button'>>;
    export const Value: React.FC<React.ComponentProps<'span'> & { placeholder?: string }>;
    export const Content: React.FC<React.ComponentProps<'div'>>;
    export const Group: React.FC<React.ComponentProps<'div'>>;
    export const Item: React.FC<React.ComponentProps<'div'> & { value: string }>;
    export const Label: React.FC<React.ComponentProps<'span'>>;
    export const Separator: React.FC<React.ComponentProps<'div'>>;
    export const ScrollUpButton: React.FC<React.ComponentProps<'button'>>;
    export const ScrollDownButton: React.FC<React.ComponentProps<'button'>>;
    export const ItemIndicator: React.FC<React.ComponentProps<'span'>>;
    export const ItemText: React.FC<React.ComponentProps<'span'>>;
    export const Portal: React.FC<React.ComponentProps<'div'>>;
    export const Viewport: React.FC<React.ComponentProps<'div'>>;
    
    // Add Select type definition with correct types
    export type SelectProps = {
        onValueChange: (value: string) => void;
        defaultValue?: string;
        children: React.ReactNode;
    };
   
  }
  
   // radix-ui-select.d.ts
declare module '@radix-ui/react-select' {
    import * as React from 'react';
   

    export type SelectProps = {
        onValueChange: (value: string) => void;
        defaultValue?: string;
        children: React.ReactNode;
    };

    export const Select: React.FC<SelectProps>;
    export const SelectTrigger: React.FC<React.ComponentProps<'button'>>;
    export const SelectValue: React.FC<React.ComponentProps<'span'>>;
    export const SelectContent: React.FC<React.ComponentProps<'div'>>;
    export const SelectItem: React.FC<{
        value: string;
        children: React.ReactNode;
    }>;
}

  