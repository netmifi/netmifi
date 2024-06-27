// course type-of-data for backend
declare interface Course {
    readonly id: string;
    type: 'paid' | 'free';
    subject: string;
    thumbnail: string;
    title: string;
    videoURL: string;
    instructorName: string;
    instructorProfileImage: string; 
    instructorProfileURL: string;
    date: string;
}
declare interface WindowSize {
    width: number | undefined;
    height: number | undefined;
}

declare interface NavLinks {
    href: string;
    label: string;
    icon: IconType;
    onlyUser: boolean;
    onlyGuest: boolean;
    onlySmallScreen: boolean;
} 

declare interface PageProps {
    className: string;
}

declare interface LoaderProps  {
 className?: string;
 type: 'text' | 'loader' | 'all';
 size?: number;
}

declare interface CoursesJumbotronProps  { 
    title: string;
    thumbnail: string;
    exploreSectionRef: React.Ref<HTMLElement> 
}

declare interface CoursesCardProps extends Course  { 
    className?: string; 
}

declare interface CourseCarouselProps { 
    title: string;
    link: string;
    data: Course[]
 }