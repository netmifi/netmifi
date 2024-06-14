declare interface WindowSize {
    width: number | undefined;
    height: number | undefined;
}

declare interface NavLinks {
    href: string,
    label: string,
    icon: IconType,
    onlyUser: boolean,
    onlyGuest: boolean,
    onlySmallScreen: boolean
} 

declare interface PageProps {
    className: string
}

declare interface NavbarNavLinks  { isActive: boolean, isPending: boolean, isTransitioning: boolean }