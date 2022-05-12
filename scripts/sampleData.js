const sampleData = {
    users: [
        {
            id: 1,
            firstName: 'Rob',
            lastName: 'Hope',
            profilePic: 'Rob.png'
        },
        {
            id: 2,
            firstName: 'Sophie',
            lastName: 'Brecht',
            profilePic: 'Sophie.png'
        },
        {
            id: 3,
            firstName: 'James',
            lastName: '',
            profilePic: 'James.png'
        },
        {
            id: 4,
            firstName: 'Cameron',
            lastName: 'Lawrence',
            profilePic: 'Cameron.png'
        }
    ],
    comments: [
        {
            id: 1,
            date: "2022-04-20 12:00:00",
            text: "Love the native memberships and the zipless themes, I was just asked by a friend about options for a new site, and I think I know what I'll be recommending then... ",
            parent: null,
            user: 4,
            upvotes: []
        },
        {
            id: 2,
            date: "2022-05-09 12:00:00",
            text: "Switched our blog from Hubspot to Ghost a year ago -- turned out to be a great decision. Looking forward to this update....the in-platform analytics look especially delicious. :)",
            parent: null,
            user: 2,
            upvotes: []
        },
        {
            id: 3,
            date: "2022-05-10 10:00:00",
            text: "Thanks Sophie! Last year has been an absolute goldrush for the creator economy. Slowly at first, then all at once. Will be interesting to see how this ecosystem evolves over the next few years.",
            parent: 2,
            user: 3,
            upvotes: []
        },
        {
            id: 4,
            date: "2022-05-10 14:00:00",
            text: "Jeepers now that's a huge release with some big community earnings to back it - it must be so rewarding seeing creators quit their day jobs after monetizing (with real MRR) on the new platform.",
            parent: null,
            user: 3,
            upvotes: []
        }
    ]
}