const sampleData = {
    users: [
        {
            firstName: 'Rob',
            lastName: 'Hope',
            profilePic: 'Rob.png'
        },
        {
            firstName: 'Sophie',
            lastName: 'Brecht',
            profilePic: 'Sophie.png'
        },
        {
            firstName: 'James',
            lastName: '',
            profilePic: 'James.png'
        },
        {
            firstName: 'Cameron',
            lastName: 'Lawrence',
            profilePic: 'Cameron.png'
        }
    ]
}

const User = require('./User');

function initialDBSetup() {
    // Add users
    // there's no way of adding userrs through the demo interface
    User.create(sampleData.users);
}


module.exports = initialDBSetup;