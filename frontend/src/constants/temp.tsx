import { bubbles, contentCreatorAsian, conversation1, conversation2, profile } from "@/assets/images";

const tempCourses: Course[] = [
    {
        id: "123e4567-e89b-12d3-a456-426614174000",
        type: 'paid',
        subject: 'affiliate marketing',
        thumbnail: conversation1,
        title: 'The Ultimate JavaScript Course',
        videoURL: 'https://www.example.com/video1',
        instructorName: 'John Doe',
        instructorProfileImage: 'https://via.placeholder.com/100x100',
        instructorProfileURL: 'https://www.example.com/johndoe',
        isVerified: true,
        isFollowing: true,
        date: '2 years ago'
    },
    {
        id: "789a0123-4567-89ab-cdef-123456789000",
        type: 'free',
        subject: 'affiliate marketing',
        thumbnail: 'https://via.placeholder.com/150x150',
        title: 'Mastering React for Beginners',
        videoURL: 'https://www.example.com/video2',
        instructorName: 'Jane Smith',
        instructorProfileImage: 'https://via.placeholder.com/100x100',
        instructorProfileURL: 'https://www.example.com/janesmith',
        isVerified: false,
        isFollowing: true,
        date: '3 months ago'
    },

    {
        id: "fedcba09-8765-4321-abcd-efghijklmnop",
        type: 'paid',
        subject: 'email marketing',
        thumbnail: contentCreatorAsian,
        title: 'Advanced Python for Data Science',
        videoURL: 'https://www.example.com/video10',
        instructorName: 'Dr. Alice White',
        instructorProfileImage: 'https://via.placeholder.com/100x100',
        instructorProfileURL: 'https://www.example.com/alicewhite',
        isVerified: true,
        isFollowing: true,
        date: '1 year ago'
    },

    {
        id: "01234567-89ab-cdef-fedc-ba0987654321",
        type: 'free',
        subject: 'email copywriting',
        thumbnail: conversation2,
        title: 'Git for Beginners - A Practical Guide',
        videoURL: 'https://www.example.com/video11',
        instructorName: 'Michael Chen',
        instructorProfileImage: 'https://via.placeholder.com/100x100',
        instructorProfileURL: 'https://www.example.com/michaelchen',
        isVerified: false,
        isFollowing: true,
        date: '6 months ago'
    },
    {
        id: "cbacdef0-1234-5678-9abc-fedcba098765",
        type: 'paid',
        subject: 'ui/ux design',
        thumbnail: bubbles,
        title: 'The Complete Web Developer Bootcamp 2024',
        videoURL: 'https://www.example.com/video12',
        instructorName: 'David Miller',
        instructorProfileImage: 'https://via.placeholder.com/100x100',
        instructorProfileURL: 'https://www.example.com/davidmiller',
        isVerified: true,
        isFollowing: true,
        date: '10 months ago'
    },
    {
        id: "fec0ba98-7654-3210-fedc-ba0987654321",
        type: 'free',
        subject: 'ui/ux design',
        thumbnail: 'https://via.placeholder.com/150x150',
        title: 'Node.js Crash Course: From Beginner to Pro',
        videoURL: 'https://www.example.com/video13',
        instructorName: 'Sarah Lee',
        instructorProfileImage: 'https://via.placeholder.com/100x100',
        instructorProfileURL: 'https://www.example.com/sarahlee',
        isVerified: false,
        isFollowing: true,
        date: '4 months ago'
    },
    {
        id: "98765432-0123-4567-89ab-cdef01234567",
        type: 'paid',
        subject: 'affiliate marketing',
        thumbnail: 'https://via.placeholder.com/150x150',
        title: 'UI/UX Design for Web & Mobile Apps',
        videoURL: 'https://www.example.com/video14',
        instructorName: 'Emily Jones',
        instructorProfileImage: 'https://via.placeholder.com/100x100',
        instructorProfileURL: 'https://www.example.com/emilyjones',
        isVerified: true,
        isFollowing: true,
        date: '9 months ago'
    },
    {
        id: "21098765-4321-0fed-cba9-876543210123",
        type: 'free',
        subject: 'content creation',
        thumbnail: 'https://via.placeholder.com/150x150',
        title: 'The Art of Public Speaking',
        videoURL: 'https://www.example.com/video15',
        instructorName: 'William Brown',
        instructorProfileImage: 'https://via.placeholder.com/100x100',
        instructorProfileURL: 'https://www.example.com/williambrown',
        isVerified: true,
        isFollowing: true,
        date: '7 months ago'
    },
    {
        id: "3210fedc-ba98-7654-3210-fedcba098765",
        type: 'paid',
        subject: 'content creation',
        thumbnail: 'https://via.placeholder.com/150x150',
        title: 'The Agile Project Management Course',
        videoURL: 'https://www.example.com/video16',
        instructorName: 'Olivia Rodriguez',
        instructorProfileImage: 'https://via.placeholder.com/100x100',
        instructorProfileURL: 'https://www.example.com/oliviarodriguez',
        isVerified: true,
        isFollowing: true,
        date: '1 year ago'
    },
    {
        id: "43210987-6543-210f-edc0-ba9876543210",
        type: 'free',
        subject: 'graphic design',
        thumbnail: 'https://via.placeholder.com/150x150',
        title: 'SEO Fundamentals for Beginners',
        videoURL: 'https://www.example.com/video17',
        instructorName: 'Christopher Lee',
        instructorProfileImage: 'https://via.placeholder.com/100x100',
        instructorProfileURL: 'https://www.example.com/christopherlee',
        isVerified: true,
        isFollowing: true,
        date: '5 months ago'
    },
    {
        id: "543210fe-dcba-9876-5432-10fedcba0987",
        type: 'paid',
        subject: 'technical writing',
        thumbnail: 'https://via.placeholder.com/150x150',
        title: 'Machine Learning with Python',
        videoURL: 'https://www.example.com/video18',
        instructorName: 'Amanda Garcia',
        instructorProfileImage: 'https://via.placeholder.com/100x100',
        instructorProfileURL: 'https://www.example.com/amandagarci',
        isVerified: true,
        isFollowing: true,
        date: '8 months ago'
    }
];

const tempBlogs: Blog[] = [
    {
        id: "123e4567-e89b-12d3-a456-426614174000",
        category: 'Technology',
        thumbnail: contentCreatorAsian,
        title: 'The Future of Web Development',
        body: 'In this blog post, we will explore the latest trends and technologies shaping the future of web development...',
        posterName: 'John Doe',
        posterProfileImage: conversation1,
        posterProfileURL: 'https://www.example.com/johndoe',
        isVerified: false,
        isFollowing: true,
        isLiked: true,
        likes: 120,
        comments: {
            count: 25,
            comments: [
                {
                    id: '13245-tu672-91890-u1h721gew7',
                    comment: 'This is a very nice course',
                    isLiked: true,
                    commenter: {
                        id: '178gbd3-4094nyu-teb53b3',
                        username: 'marvis travail',
                        profile: profile,
                        isVerified: true,
                    },
                    likes: 7,
                    date: '7 hours ago',
                    replies: {
                        count: 4,
                        replies: [
                            {
                                id: '158793-ifujuds-6784-euyvw',
                                reply: 'Thanks, hope you enjoyed it',
                                commentId: '13415-gt83rghwriuoes-574289',
                                isLiked: true,
                                likes: 400,
                                date: '8 minutes ago',
                                replier: {
                                    id: '31267fdgvx-71tsyewew-7239b1',
                                    username: 'Rick Tochukwu',
                                    profile: bubbles,
                                    isVerified: true,
                                },
                                replyTo: {
                                    id: '13245-tu672-91890-u1h721gew7',
                                    username: 'marvis travail',
                                    profile: profile,
                                },
                            }
                        ]
                    }
                }
            ]
        },
        views: 8790,
        date: '1 year ago'
    },
    {
        id: "789a0123-4567-89ab-cdef-123456789000",
        category: 'Travel',
        thumbnail: conversation1,
        title: 'Exploring the Hidden Gems of Italy',
        body: 'Italy is known for its iconic landmarks, but there are also many hidden gems waiting to be discovered...',
        posterName: 'Jane Smith',
        posterProfileImage: 'https://via.placeholder.com/100x100',
        posterProfileURL: 'https://www.example.com/janesmith',
        isLiked: false,
        likes: 87,
        isVerified: false,
        isFollowing: false,
        comments: {
            count: 14,
            comments: [
                {
                    id: '13245-tu672-91890-u1h721gew7',
                    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dolorem, dicta maiores vel sequi adipisci necessitatibus hic iure quibusdam facilis sint harum corporis minima itaque ad assumenda sed cumque numquam optio? Qui quisquam eveniet quod quis quasi veniam magnam rem nemo. Quos unde illum laborum architecto optio reiciendis possimus expedita!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dolorem, dicta maiores vel sequi adipisci necessitatibus hic iure quibusdam facilis sint harum corporis minima itaque ad assumenda sed cumque numquam optio? Qui quisquam eveniet quod quis quasi veniam magnam rem nemo. Quos unde illum laborum architecto optio reiciendis possimus expedita! Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dolorem, dicta maiores vel sequi adipisci necessitatibus hic iure quibusdam facilis sint harum corporis minima itaque ad assumenda sed cumque numquam optio? Qui quisquam eveniet quod quis quasi veniam magnam rem nemo. Quos unde illum laborum architecto optio reiciendis possimus expedita!',
                    isLiked: true,
                    commenter: {
                        id: '178gbd3-4094nyu-teb53b3',
                        username: 'king mane',
                        profile: profile,
                        isVerified: true,
                    },
                    likes: 7,
                    date: '7 hours ago',
                    replies: {
                        count: 4,
                        replies: [
                            {
                                id: '158793-ifujuds-6784-euyvw',
                                reply: 'Thanks, hope you enjoyed it',
                                commentId: '13415-gt83rghwriuoes-574289',
                                isLiked: true,
                                likes: 400,
                                date: '8 minutes ago',
                                replier: {
                                    id: '31267fdgvx-71tsyewew-7239b1',
                                    username: 'Rick Tochukwu',
                                    profile: bubbles,
                                    isVerified: true,
                                },
                                replyTo: {
                                    id: '13245-tu672-91890-u1h721gew7',
                                    username: 'marvis travail',
                                    profile: profile,
                                },
                            }
                        ]
                    }
                },
                {
                    id: '13245-tu672-91890-u1h721gew7',
                    comment: 'This is a very nice course',
                    isLiked: true,
                    commenter: {
                        id: '178gbd3-4094nyu-teb53b3',
                        username: 'marvis travail',
                        profile: profile,
                        isVerified: true,
                    },
                    likes: 7,
                    date: '7 hours ago',
                    replies: {
                        count: 4,
                        replies: [
                            {
                                id: '158793-ifujuds-6784-euyvw',
                                reply: 'Thanks, hope you enjoyed it',
                                commentId: '13415-gt83rghwriuoes-574289',
                                isLiked: true,
                                likes: 400,
                                date: '8 minutes ago',
                                replier: {
                                    id: '31267fdgvx-71tsyewew-7239b1',
                                    username: 'Rick Tochukwu',
                                    profile: bubbles,
                                    isVerified: true,
                                },
                                replyTo: {
                                    id: '13245-tu672-91890-u1h721gew7',
                                    username: 'marvis travail',
                                    profile: profile,
                                },
                            }
                        ]
                    }
                },
                {
                    id: '13245-tu672-91890-u1h721gew7',
                    comment: 'This is a very nice course',
                    isLiked: true,
                    commenter: {
                        id: '178gbd3-4094nyu-teb53b3',
                        username: 'marvis travail',
                        profile: profile,
                        isVerified: true,
                    },
                    likes: 7,
                    date: '7 hours ago',
                    replies: {
                        count: 4,
                        replies: [
                            {
                                id: '158793-ifujuds-6784-euyvw',
                                reply: 'Thanks, hope you enjoyed it',
                                commentId: '13415-gt83rghwriuoes-574289',
                                isLiked: true,
                                likes: 400,
                                date: '8 minutes ago',
                                replier: {
                                    id: '31267fdgvx-71tsyewew-7239b1',
                                    username: 'Rick Tochukwu',
                                    profile: bubbles,
                                    isVerified: true,
                                },
                                replyTo: {
                                    id: '13245-tu672-91890-u1h721gew7',
                                    username: 'marvis travail',
                                    profile: profile,
                                },
                            },
                            {
                                id: '158793-ifujuds-6784-euyvw',
                                reply: 'Thanks, hope you enjoyed it',
                                commentId: '13415-gt83rghwriuoes-574289',
                                isLiked: true,
                                likes: 400,
                                date: '8 minutes ago',
                                replier: {
                                    id: '31267fdgvx-71tsyewew-7239b1',
                                    username: 'Rick Tochukwu',
                                    profile: bubbles,
                                    isVerified: true,
                                },
                                replyTo: {
                                    id: '13245-tu672-91890-u1h721gew7',
                                    username: 'marvis travail',
                                    profile: profile,
                                },
                            },
                            {
                                id: '158793-ifujuds-6784-euyvw',
                                reply: 'Thanks, hope you enjoyed it',
                                commentId: '13415-gt83rghwriuoes-574289',
                                isLiked: true,
                                likes: 400,
                                date: '8 minutes ago',
                                replier: {
                                    id: '31267fdgvx-71tsyewew-7239b1',
                                    username: 'Rick Tochukwu',
                                    profile: bubbles,
                                    isVerified: true,
                                },
                                replyTo: {
                                    id: '13245-tu672-91890-u1h721gew7',
                                    username: 'marvis travail',
                                    profile: profile,
                                },
                            },
                        ]
                    }
                },
            ]
        },
        views: 90,
        date: '6 months ago'
    },
    {
        id: "fedcba09-8765-4321-abcd-efghijklmnop",
        category: 'Food',
        thumbnail: conversation1,
        title: 'The Best Vegan Recipes for Beginners',
        body: 'Going vegan doesn\'t have to be difficult! This blog post features delicious and easy vegan recipes...',
        posterName: 'Sarah Lee',
        posterProfileImage: profile,
        posterProfileURL: 'https://www.example.com/sarahlee',
        isVerified: true,
        isFollowing: true,
        isLiked: false,
        likes: 152,
        comments: {
            count: 38,
            comments: [
                {
                    id: '13245-tu672-91890-u1h721gew7',
                    comment: 'This is a very nice course',
                    isLiked: true,
                    commenter: {
                        id: '178gbd3-4094nyu-teb53b3',
                        username: 'marvis travail',
                        profile: profile,
                        isVerified: false,
                    },
                    likes: 7,
                    date: '7 hours ago',
                    replies: {
                        count: 4,
                        replies: [
                            {
                                id: '158793-ifujuds-6784-euyvw',
                                reply: 'Thanks, hope you enjoyed it',
                                commentId: '13415-gt83rghwriuoes-574289',
                                isLiked: true,
                                likes: 400,
                                date: '8 minutes ago',
                                replier: {
                                    id: '31267fdgvx-71tsyewew-7239b1',
                                    username: 'Rick Tochukwu',
                                    profile: bubbles,
                                    isVerified: true,
                                },
                                replyTo: {
                                    id: '13245-tu672-91890-u1h721gew7',
                                    username: 'marvis travail',
                                    profile: profile,
                                },
                            }
                        ]
                    }
                }
            ]
        },
        views: 189,
        date: '3 months ago'
    },
    {
        id: "01234567-89ab-cdef-fedc-ba0987654321",
        category: 'Lifestyle',
        thumbnail: bubbles,
        title: 'Building a Minimalist Wardrobe',
        body: 'Decluttering your closet can be a liberating experience. Learn tips on creating a minimalist wardrobe...',
        posterName: 'Michael Chen',
        posterProfileImage: conversation2,
        posterProfileURL: 'https://www.example.com/michaelchen',
        isVerified: true,
        isFollowing: false,
        isLiked: true,
        likes: 98,
        comments: {
            count: 19,
            comments: [
                {
                    id: '13245-tu672-91890-u1h721gew7',
                    comment: 'This is a very nice course',
                    isLiked: true,
                    commenter: {
                        id: '178gbd3-4094nyu-teb53b3',
                        username: 'marvis travail',
                        profile: profile,
                        isVerified: true,
                    },
                    likes: 7,
                    date: '7 hours ago',
                    replies: {
                        count: 4,
                        replies: [
                            {
                                id: '158793-ifujuds-6784-euyvw',
                                reply: 'Thanks, hope you enjoyed it',
                                commentId: '13415-gt83rghwriuoes-574289',
                                isLiked: true,
                                likes: 400,
                                date: '8 minutes ago',
                                replier: {
                                    id: '31267fdgvx-71tsyewew-7239b1',
                                    username: 'Rick Tochukwu',
                                    profile: bubbles,
                                    isVerified: true,
                                },
                                replyTo: {
                                    id: '13245-tu672-91890-u1h721gew7',
                                    username: 'marvis travail',
                                    profile: profile,
                                },
                            }
                        ]
                    }
                }
            ]
        },
        views: 678,
        date: '8 months ago'
    },
    {
        id: "cbacdef0-1234-5678-9abc-fedcba098765",
        category: 'Business',
        thumbnail: 'https://via.placeholder.com/150x150',
        title: 'The Power of Effective Communication in the Workplace',
        body: 'Communication is key to success in any business. This blog post explores strategies for effective communication...',
        posterName: 'David Miller',
        posterProfileImage: bubbles,
        posterProfileURL: 'https://www.example.com/davidmiller',
        isVerified: true,
        isFollowing: true,
        isLiked: false,
        likes: 115,
        comments: {
            count: 27,
            comments: [
                {
                    id: '13245-tu672-91890-u1h721gew7',
                    comment: 'This is a very nice course',
                    isLiked: true,
                    commenter: {
                        id: '178gbd3-4094nyu-teb53b3',
                        username: 'marvis travail',
                        profile: profile,
                        isVerified: true,
                    },
                    likes: 7,
                    date: '7 hours ago',
                    replies: {
                        count: 4,
                        replies: [
                            {
                                id: '158793-ifujuds-6784-euyvw',
                                reply: 'Thanks, hope you enjoyed it',
                                commentId: '13415-gt83rghwriuoes-574289',
                                isLiked: true,
                                likes: 400,
                                date: '8 minutes ago',
                                replier: {
                                    id: '31267fdgvx-71tsyewew-7239b1',
                                    username: 'Rick Tochukwu',
                                    profile: bubbles,
                                    isVerified: true,
                                },
                                replyTo: {
                                    id: '13245-tu672-91890-u1h721gew7',
                                    username: 'marvis travail',
                                    profile: profile,
                                },
                            }
                        ]
                    }
                }
            ]
        },
        views: 218,
        date: '4 months ago'
    },
    {
        id: "fec0ba98-7654-3210-fedc-ba0987654321",
        category: 'Photography',
        thumbnail: 'https://via.placeholder.com/150x150',
        title: 'Capturing Stunning Landscapes: Photography Tips for Beginners',
        body: 'The world is full of breathtaking landscapes waiting to be captured. This blog post provides tips for beginners...',
        posterName: 'Sarah Lee',
        posterProfileImage: 'https://via.placeholder.com/100x100',
        posterProfileURL: 'https://www.example.com/sarahlee',
        isVerified: true,
        isFollowing: false,
        isLiked: true,
        likes: 178,
        comments: {
            count: 42,
            comments: [
                {
                    id: '13245-tu672-91890-u1h721gew7',
                    comment: 'This is a very nice course',
                    isLiked: true,
                    commenter: {
                        id: '178gbd3-4094nyu-teb53b3',
                        username: 'marvis travail',
                        profile: profile,
                        isVerified: true,
                    },
                    likes: 7,
                    date: '7 hours ago',
                    replies: {
                        count: 4,
                        replies: [
                            {
                                id: '158793-ifujuds-6784-euyvw',
                                reply: 'Thanks, hope you enjoyed it',
                                commentId: '13415-gt83rghwriuoes-574289',
                                isLiked: true,
                                likes: 400,
                                date: '8 minutes ago',
                                replier: {
                                    id: '31267fdgvx-71tsyewew-7239b1',
                                    username: 'Rick Tochukwu',
                                    profile: bubbles,
                                    isVerified: true,
                                },
                                replyTo: {
                                    id: '13245-tu672-91890-u1h721gew7',
                                    username: 'marvis travail',
                                    profile: profile,
                                },
                            }
                        ]
                    }
                }
            ]
        },
        views: 654,
        date: '2 years ago'
    },
    {
        id: "98765432-0123-4567-89ab-cdef01234567",
        category: 'Health & Fitness',
        thumbnail: 'https://via.placeholder.com/150x150',
        title: 'Developing a Sustainable Exercise Routine',
        body: 'Exercise is essential for a healthy lifestyle, but consistency is key. Learn tips for building a sustainable routine...',
        posterName: 'Emily Jones',
        posterProfileImage: 'https://via.placeholder.com/100x100',
        posterProfileURL: 'https://www.example.com/emilyjones',
        isVerified: true,
        isFollowing: true,
        isLiked: false,
        likes: 132,
        comments: {
            count: 31,
            comments: [
                {
                    id: '13245-tu672-91890-u1h721gew7',
                    comment: 'This is a very nice course',
                    isLiked: true,
                    commenter: {
                        id: '178gbd3-4094nyu-teb53b3',
                        username: 'marvis travail',
                        profile: profile,
                        isVerified: true,
                    },
                    likes: 7,
                    date: '7 hours ago',
                    replies: {
                        count: 4,
                        replies: [
                            {
                                id: '158793-ifujuds-6784-euyvw',
                                reply: 'Thanks, hope you enjoyed it',
                                commentId: '13415-gt83rghwriuoes-574289',
                                isLiked: true,
                                likes: 400,
                                date: '8 minutes ago',
                                replier: {
                                    id: '31267fdgvx-71tsyewew-7239b1',
                                    username: 'Rick Tochukwu',
                                    profile: bubbles,
                                    isVerified: true,
                                },
                                replyTo: {
                                    id: '13245-tu672-91890-u1h721gew7',
                                    username: 'marvis travail',
                                    profile: profile,
                                },
                            }
                        ]
                    }
                }
            ]
        },
        views: 2158,
        date: '9 months ago'
    },
    {
        id: "21098765-4321-0fed-cba9-876543210123",
        category: 'Music',
        thumbnail: 'https://via.placeholder.com/150x150',
        title: 'The History of Jazz Music: From Its Roots to Modern Day',
        body: 'Jazz music is a rich and vibrant genre with a long history. This blog post explores the evolution of jazz...',
        posterName: 'William Brown',
        posterProfileImage: 'https://via.placeholder.com/100x100',
        posterProfileURL: 'https://www.example.com/williambrown',
        isVerified: true,
        isFollowing: true,
        isLiked: true,
        likes: 85,
        comments: {
            count: 17,
            comments: [
                {
                    id: '13245-tu672-91890-u1h721gew7',
                    comment: 'This is a very nice course',
                    isLiked: true,
                    commenter: {
                        id: '178gbd3-4094nyu-teb53b3',
                        username: 'marvis travail',
                        profile: profile,
                        isVerified: true,
                    },
                    likes: 7,
                    date: '7 hours ago',
                    replies: {
                        count: 4,
                        replies: [
                            {
                                id: '158793-ifujuds-6784-euyvw',
                                reply: 'Thanks, hope you enjoyed it',
                                commentId: '13415-gt83rghwriuoes-574289',
                                isLiked: true,
                                likes: 400,
                                date: '8 minutes ago',
                                replier: {
                                    id: '31267fdgvx-71tsyewew-7239b1',
                                    username: 'Rick Tochukwu',
                                    profile: bubbles,
                                    isVerified: true,
                                },
                                replyTo: {
                                    id: '13245-tu672-91890-u1h721gew7',
                                    username: 'marvis travail',
                                    profile: profile,
                                },
                            }
                        ]
                    }
                }
            ]
        },
        views: 4163,
        date: '7 months ago'
    },
    {
        id: "3210fedc-ba98-7654-3210-fedcba098765",
        category: 'Entertainment',
        thumbnail: 'https://via.placeholder.com/150x150',
        title: 'The Best Board Games for Family Game Night',
        body: 'Board games are a fantastic way to connect with family and friends. This blog post recommends some of the best board games...',
        posterName: 'Olivia Rodriguez',
        posterProfileImage: 'https://via.placeholder.com/100x100',
        posterProfileURL: 'https://www.example.com/oliviarodriguez',
        isVerified: true,
        isFollowing: true,
        isLiked: false,
        likes: 101,
        comments: {
            count: 24,
            comments: [
                {
                    id: '13245-tu672-91890-u1h721gew7',
                    comment: 'This is a very nice course',
                    isLiked: true,
                    commenter: {
                        id: '178gbd3-4094nyu-teb53b3',
                        username: 'marvis travail',
                        profile: profile,
                        isVerified: true,
                    },
                    likes: 7,
                    date: '7 hours ago',
                    replies: {
                        count: 4,
                        replies: [
                            {
                                id: '158793-ifujuds-6784-euyvw',
                                reply: 'Thanks, hope you enjoyed it',
                                commentId: '13415-gt83rghwriuoes-574289',
                                isLiked: true,
                                likes: 400,
                                date: '8 minutes ago',
                                replier: {
                                    id: '31267fdgvx-71tsyewew-7239b1',
                                    username: 'Rick Tochukwu',
                                    profile: bubbles,
                                    isVerified: true,
                                },
                                replyTo: {
                                    id: '13245-tu672-91890-u1h721gew7',
                                    username: 'marvis travail',
                                    profile: profile,
                                },
                            }
                        ]
                    }
                }
            ]
        },
        views: 4890,
        date: '5 months ago'
    },
    {
        id: "43210987-6543-210f-edc0-ba9876543210",
        category: 'Science',
        thumbnail: 'https://via.placeholder.com/150x150',
        title: 'The Wonders of the Natural World: Exploring Biodiversity',
        body: 'Our planet is teeming with diverse life forms. This blog post explores the concept of biodiversity...',
        posterName: 'Christopher Lee',
        posterProfileImage: 'https://via.placeholder.com/100x100',
        posterProfileURL: 'https://www.example.com/christopherlee',
        isVerified: true,
        isFollowing: false,
        isLiked: true,
        likes: 147,
        comments: {
            count: 35,
            comments: [
                {
                    id: '13245-tu672-91890-u1h721gew7',
                    comment: 'This is a very nice course',
                    isLiked: true,
                    commenter: {
                        id: '178gbd3-4094nyu-teb53b3',
                        username: 'marvis travail',
                        profile: profile,
                        isVerified: true,
                    },
                    likes: 7,
                    date: '7 hours ago',
                    replies: {
                        count: 4,
                        replies: [
                            {
                                id: '158793-ifujuds-6784-euyvw',
                                reply: 'Thanks, hope you enjoyed it',
                                commentId: '13415-gt83rghwriuoes-574289',
                                isLiked: true,
                                likes: 400,
                                date: '8 minutes ago',
                                replier: {
                                    id: '31267fdgvx-71tsyewew-7239b1',
                                    username: 'Rick Tochukwu',
                                    profile: bubbles,
                                    isVerified: true,
                                },
                                replyTo: {
                                    id: '13245-tu672-91890-u1h721gew7',
                                    username: 'marvis travail',
                                    profile: profile,
                                },
                            }
                        ]
                    }
                }
            ]
        },
        views: 790,
        date: '10 months ago'
    }
];



export { tempCourses, tempBlogs }