import './CommentList.scss';
import CommentView from '../CommentView/CommentView';

let c = [
    {
        "text": "This is a comment.",
        "user": {
            "firstName": "Cameron",
            "lastName": "Lawrence",
            "profilePic": "Cameron.png",
            "id": "627db71a4c745dcca023d6a4"
        },
        "children": [
            {
                "text": "This is a comment.",
                "user": {
                    "firstName": "Cameron",
                    "lastName": "Lawrence",
                    "profilePic": "Cameron.png",
                    "id": "627db71a4c745dcca023d6a4"
                },
                "parent": null,
                "votes": [],
                "createdAt": "2022-05-13T02:41:02.831Z",
                "updatedAt": "2022-05-13T02:41:02.831Z",
                "id": "627dc53e9291ebfefa4db99a"
            }
        ],
        "votes": [],
        "createdAt": "2022-05-13T02:41:02.831Z",
        "updatedAt": "2022-05-13T02:41:02.831Z",
        "id": "627dc53e9291ebfefa4db99a"
    },
    {
        "text": "This is a comment.",
        "user": {
            "firstName": "Cameron",
            "lastName": "Lawrence",
            "profilePic": "Cameron.png",
            "id": "627db71a4c745dcca023d6a4"
        },
        "children": [
            {
                "text": "This is a comment.",
                "user": {
                    "firstName": "Cameron",
                    "lastName": "Lawrence",
                    "profilePic": "Cameron.png",
                    "id": "627db71a4c745dcca023d6a4"
                },
                "parent": null,
                "votes": [],
                "createdAt": "2022-05-13T02:41:02.831Z",
                "updatedAt": "2022-05-13T02:41:02.831Z",
                "id": "627dc53e9291ebfefa4db99a"
            }
        ],
        "votes": [],
        "createdAt": "2022-05-13T02:41:02.831Z",
        "updatedAt": "2022-05-13T02:41:02.831Z",
        "id": "627dc53e9291ebfefa4db99a"
    }
];

function CommentList(props) {
    let comments = props.comments || c;

    let child = <div className="no-comments"> No Comments! </div>;

    if (comments && comments.length) {
        child = comments.map(comment => <CommentView key={comment.id} comment={comment}></CommentView>);
    }

    return (
        <>
            {child}
        </>
    );
}

export default CommentList;