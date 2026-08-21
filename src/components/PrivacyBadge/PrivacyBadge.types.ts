export type  MaskPattern = 'all' | 'last4' | 'first4';  

export interface PrivacyBadgeProps {
    sensitiveNumber:string;
    label?:string;
    maskPattern?: MaskPattern;

}