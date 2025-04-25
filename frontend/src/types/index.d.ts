// THIS FILE SHOULD NOT HAVE ANY IMPORT OR EXPORT
// please declare all types on this file
declare interface userType {
  type: "guest" | "user" | "instructor" | "blogger" | "admin";
}

declare interface SearchParams {
  q: string
  type?: string
  page?: number
  limit?: number
}

declare interface Comments {
  count: number;
  comments?: {
    readonly id: string;
    comment: string;
    isLiked: boolean;
    likes: number;
    date: string;

    commenter: {
      readonly id: string;
      username: string;
      profile: string;
      isVerified: boolean;
    };

    replies?: {
      count: number;
      replies: {
        readonly id: string;
        commentId: string;
        reply: string;
        likes: number;
        isLiked: boolean;
        date: string;
        replier: {
          id: string;
          username: string;
          profile: string;
          isVerified: boolean;
        };
        replyTo: {
          readonly id: string;
          username: string;
          profile: string;
        };
      }[];
    };
  }[];
}

declare interface SearchHistory {
  readonly id: string; // MongoDB ObjectId
  query: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
declare interface Course {
  readonly id: string; // MongoDB ObjectId
  slug: string;
  type: "paid" | "free";
  price: number;
  oldPrice?: number;
  category: string;
  thumbnail: string;
  title: string;
  videoURL: string;
  instructorId: string;
  instructorName: string;
  instructorProfileImage: string;
  instructorProfileURL: string;
  rating: number;
  reviews: number;
  isVerified: boolean;
  isFollowing: boolean;
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

declare interface PurchasedCourse {
  readonly id: string;
  title: string;
  subject: string;
  thumbnail: string;
  title: string;
  progress: number;
  instructorName: string;
  instructorProfileImage: string;
  instructorProfileURL: string;
  rating: number;
  userRating: number;
  isVerified: boolean;
  isFollowing: boolean;
  isFavorite: boolean;
  collection?: never[] | string[];
  date: string;
}
declare interface Clip {
  readonly id: string;
  title: string;
  subject?: string;
  thumbnail: string; // Poster image or thumbnail of the clip
  videoUrl: string;  // Actual video source file
  duration: number;  // in seconds

  progress: number; // How much the user has watched (0–100)
  date: string; // e.g., "2 weeks ago", or an ISO date

  instructorName: string;
  instructorProfileImage: string;
  instructorProfileURL: string;

  rating: number;     // Average community rating
  userRating: number; // Logged-in user’s rating

  isVerified: boolean;
  isFollowing: boolean;
  isFavorite: boolean;

  collection?: string[]; // Tags or categories like ["marketing", "shorts"]
}


declare interface Instructor {
  readonly id: string;
  name: string;
  area: string;
  profile?: string | null;
  courses: number;
  students: number;
  certificates: number;
  averageRating: number;
  isFollowing: boolean;
  isVerified: boolean;
  date: string;
}

declare interface MemberCardProp {
  className?: string;
  title: string;
  titleClassName?: ClassValue;
  body: string;
  bodyClassName?: ClassValue;
  members: Members[];
}

declare interface Members {
  name: string;
  role: string;
  image: string;
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
  type: "text" | "loader" | "all";
  size?: number;
}

declare interface CoursesJumbotronProps {
  title: string;
  thumbnail: string;
  exploreSectionRef: React.Ref<HTMLElement>;
}

declare interface CoursesCardProps extends Course {
  className?: string;
  course: Course;
  page?: "dashboard" | "user";
}

declare interface CourseCarouselProps {
  title: string;
  link?: string;
  data: Course[];
}
declare interface InstructorCarouselProps {
  title: string;
  link?: string;
  data: Instructor[];
}

declare interface Country {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
}

declare interface PostAvatarProps {
  profileImage?: string;
  profileImageClassName?: ClassValue;
  profileName: string;
  profileURL: string;
  Title: string;
  description?: string;
  isVerified: boolean;
  onlyAvatar?: boolean;
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
  page: "child" | "self";
}

declare interface SelfPageLayoutProps {
  className: string | undefined;
  title: string;
  data: (Blog & Course)[];
  type: "blog" | "course";
}

declare interface CourseVideoSectionProps {
  form?: UseFormReturn<z.infer<typeof form>>;
  isMoreThanOne: boolean;
  readonly index: number;
  readonly id: string;
  removeField: (key: string) => void
}
declare interface CustomFormFieldProps {
  form?: UseFormReturn<z.infer<typeof form>>;
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  type?: "textarea" | "input";
  textareaType?: "comment" | "normal";
  placeholder?: string;
  isPasswordVisible?: boolean;
  inputType?: React.HTMLInputTypeAttribute;
  URLIcon?: JSX.Element;
  label?: string;
  isNotLabeled?: boolean;
  defaultValue?: string | number;
  value?: string | number;
  disabled?: boolean;
  hidden?: boolean;
  readOnly?: boolean;
  isCurrency?: boolean;
  isOptional?: boolean;
  parentClassName?: ClassValue;
}

declare interface CustomFormSelectProps
  extends Omit<CustomFormFieldProps, "isPasswordVisible"> {
  defaultOption?: string;
  options: string[];
}

declare interface CustomMultiSelectProps
  extends Omit<CustomFormFieldProps, "isPasswordVisible"> {
  options: string[];
  variant?:
  | "default"
  | "secondary"
  | "destructive"
  | "inverted"
  | null
  | undefined;
  maxCount?: number;
  animation?: number;
  modalPopover?: boolean;
  defaultOptions?: string[];
  className?: string;
}
declare interface CustomRadioGroupProps
  extends Omit<CustomFormFieldProps, "isPasswordVisible"> {
  group: { label: string; value: string }[];
  defaultChecked?: string | number;
  setDetectedValueChange?: React.Dispatch<React.SetStateAction<string>>;
}

declare interface CountryFormSelect
  extends Omit<CustomFormFieldProps, "isPasswordVisible"> {
  countries: Country[];
}

declare interface CustomContactFieldProps
  extends Omit<CustomFormFieldProps, "isPasswordVisible"> {
  dialCode?: string;
  setDialCode?: React.Dispatch<React.SetStateAction<string>>;
  setCountry?: React.Dispatch<React.SetStateAction<Country | undefined>>;
}

declare interface CustomRichTextEditorProps
  extends Omit<CustomFormFieldProps, "isPasswordVisible"> {
  config: object;
}

declare interface CustomFileFieldProps
  extends Omit<CustomFormFieldProps, "isPasswordVisible"> {
  fileRef: UseFormRegisterReturn<z.infer<typeof form>>;
  fileType?: string;
  className?: ClassValue;
  defaultImg?: string;
}
declare interface CustomListFormProps
  extends Omit<CustomFormFieldProps, "isPasswordVisible"> {
  defaultList?: string[];
  // maxCount?: number;
}

declare interface CommentTemplateProps {
  page: "blog" | "course";
  id: string;
  comment: string;
  likes: number;
  date: string;
  user: {
    readonly id: string;
    username: string;
    profile: string;
    isVerified: boolean;
  };
}

declare interface CommentProps {
  page: "blog" | "course";
  postId: string;
  comment: {
    readonly id: string;
    comment: string;
    isLiked: boolean;
    likes: number;
    date: string;

    commenter: {
      readonly id: string;
      username: string;
      profile: string;
      isVerified: boolean;
    };

    replies?: {
      count: number;
      replies: {
        readonly id: string;
        commentId: string;
        reply: string;
        likes: number;
        isLiked: boolean;
        date: string;
        replier: {
          id: string;
          username: string;
          profile: string;
          isVerified: boolean;
        };
        replyTo: {
          readonly id: string;
          username: string;
          profile: string;
        };
      }[];
    };
  };
}

declare interface ReplyProps {
  page: "blog" | "course";
  postId: string;
  commentId: string;
  reply: {
    readonly id: string;
    commentId: string;
    reply: string;
    likes: number;
    isLiked: boolean;
    date: string;
    replier: {
      id: string;
      username: string;
      profile: string;
      isVerified: boolean;
    };
    replyTo: {
      readonly id: string;
      username: string;
      profile: string;
    };
  };
}
declare interface CommentBoxProps {
  page: "blog" | "course";
  state: "comment" | "reply";
  postId: string;
  commentId?: string;
  replyTo?: string;
}

declare interface CommentOptionsProps {
  page: "blog" | "course";
  postId: string;
  isLiked: boolean;
  likes: number;
  commentId: string;
  replyTo: string;
  isReply: boolean;
}

declare interface JumbotronProps {
  className?: string;
  image: string;
  imageClassName?: ClassValue;
  title: string;
  titleClassName?: ClassValue;
  body?: string;
  bodyClassName?: ClassValue;
  button?: JSX.Element;
}
declare interface RobotronProps {
  className?: string;
  image: string;
  imageClassName?: ClassValue;
  title: string;
  titleClassName?: ClassValue;
  subtitle?: string;
  subtitleClassName?: ClassValue;
  button?: JSX.Element;
}

// declare interface ReactPlayerProps extends {}
declare interface VideoPlayerProps {
  className?: string
  thumbnail?: string
  videoUrl?: string
  videoCollection?: string[]
  currentCourseVideo?: string
  setCurrentCourseVideo?: (url: string) => void
  onCourseComplete?: () => void
  title?: string
  subtitles?: {
    src: string
    label: string
    language: string
  }[]
}

declare interface PlayerTooltipProps {
  onClick: () => void
  children: React.ReactNode
  hoverLabel: string
  disabled?: boolean
}

declare interface CustomElementClickProps {
  children: React.ReactNode;
  className?: ClassValue;
  handleSingleClick?: () => void;
  handleDoubleClick?: () => void;
}

declare interface ReviewCardProps {
  className?: string;
  name: string;
  profile: string;
  isVerified: boolean;
  profileUrl?: string;
  review: string;
  rating: number;
}

type RatingTranslation =
  | "no rating" //0
  | "very poor" // 0.5
  | "poor" // 1
  | "fair" // 1.5
  | "good" // 2
  | "very good" //2.5
  | "average" // 3
  | "excellent" // 3.5
  | "outstanding" // 4
  | "phenomenal" // 4,5
  | "perfect"; // 5

declare interface RateDialogProps {
  child: React.ReactNode;
}

declare interface MyCourseCardProps {
  className?: ClassValue;
  type: "on-page" | "self-page";
  course: PurchasedCourse;
}
declare interface ClipsCardProps {
  className?: ClassValue;
  clip: Clips;
}

declare interface MyCourseCarouselProps {
  className?: ClassValue;
  data: PurchasedCourse[];
}
declare interface ClipsCarouselProps {
  className?: ClassValue;
  data: Clips[];
}
declare interface InstructorCardProps {
  className?: ClassValue;
  instructor: Instructor;
}

declare interface ShareComponentProps {
  child: React.ReactNode;
  url: string;
  title?: string;
  text?: string;
  files?: File[];
}

declare interface NavBarProps {
  isNavOpen?: boolean;
  setIsNavOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

declare interface DashboardCardProps {
  count: number;
  label?: string;
  link?: string;
  icon: JSX.Element;
  isMoney: boolean;
  isWithdrawal?: boolean;
  date?: Date;
}

declare interface NavSearchProps {
  containerClassName?: ClassValue;
  formClassName?: ClassValue;
  className?: ClassValue;
  searchFloatButtonClassName?: ClassValue;
  fullScreen?: "md" | "sm";
  floating?: "none" | "float" | "always";
}

declare interface CustomLegendProps extends LegendProps {
  payload?: {
    value: string;
    color: string;
  }[];
}

declare interface CustomTableTooltipProps {
  hoverLabel: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

declare interface HasId {
  [key: string | number]: string | number;
  id: string;
}

declare interface DataDisplayToggleProps {
  className?: ClassValue;
  display: "grid" | "list";
  setDisplay: React.Dispatch<React.SetStateAction<"list" | "grid">>;
}
