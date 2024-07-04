declare interface Comments {
    count: number;
    comments?: {
        readonly id: string;
        comment: string;
        likes: number;
        date: string;

        commenter: {
            readonly id: string;
            username: string;
            profile: string;
        };

        replies?: {
            count: number;
            replies: {
                readonly id: string;
                reply: string;
                date: string;
                replyTo: {
                    readonly id: string;
                    username: string;
                    profile: string;
                }
            }[]
        }
    }[];
}

declare interface Course {
    // course type-of-data for backend
    readonly id: string;
    type: 'paid' | 'free';
    subject: string;
    thumbnail: string;
    title: string;
    videoURL: string;
    instructorName: string;
    instructorProfileImage: string;
    instructorProfileURL: string;
    isVerified: boolean;
    isFollowing: boolean,
    date: string;
}

declare interface Blog {
    readonly id: string;
    category: string;
    thumbnail: string;
    title: string;
    body: string;
    posterName: string;
    posterProfileImage: string;
    posterProfileURL: string;
    isVerified: boolean;
    isFollowing: boolean;
    isLiked: boolean;
    likes: number;
    views: number;
    comments: Comments;
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

declare interface LoaderProps {
    className?: string;
    type: 'text' | 'loader' | 'all';
    size?: number;
}

declare interface CoursesJumbotronProps {
    title: string;
    thumbnail: string;
    exploreSectionRef: React.Ref<HTMLElement>
}

declare interface CoursesCardProps extends Course {
    className?: string;
}

declare interface CourseCarouselProps {
    title: string;
    link: string;
    data: Course[];
}
declare interface PostAvatarProps {
    profileImage?: string;
    profileName: string;
    profileURL: string;
    description?: string;
    isVerified: boolean;
}
declare interface BlogCardProps extends Blog {
    className?: string;
}

declare interface BlogCarouselProps {
    title: string;
    link?: string;
    data: Blog[];
}

declare interface LayoutPageProps {
    className?: string;
    page: 'child' | 'self';
}

declare interface SelfPageLayoutProps {
    className: string | undefined;
    title: string;
    data: (Blog | Course)[];
    type: 'blog' | 'course'
}

declare interface CustomFormFieldProps {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    type: 'textarea' | 'input',
    placeholder: string;
    isPasswordVisible?: boolean;
    label?: string;
    isNotLabeled?: boolean;
    defaultValue?: string;
    disabled?: boolean;
    hidden?: boolean;
}

declare interface CommentsProps {
    data: Comments;
    postId: string;
}