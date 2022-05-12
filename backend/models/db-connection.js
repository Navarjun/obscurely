const URL = 'mongodb://127.0.0.1:27017/obscurely';

const mongoose = require('mongoose');
const Comment = require('./Comment');
const User = require('./User');

main()
    .then(() => {
        console.log('DB connected');
        User.find()
            .then(docs => {
                if (docs.length) return;

                const initialDBSetup = require('./initialSetupHelper');
                initialDBSetup();
            })
    })
    .catch(err => console.log(err));


async function main() {
    await mongoose.connect(URL);
}
