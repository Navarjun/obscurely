const DH = new DataHelper();

// ENTRY POINT
DH.loadData().then(() => {
    updateLogin();
    bindEvents();
    loadInterface();
});

// FUNCTION TO VIEW THE INTERFACE ONCE THE DATA HAS LOADED
function loadInterface() {
    let commentsHTML = DH.comments.map(d => {
            let comment = new Comment(d);
            // console.log(comment);
            return comment.html();
        })
        .reverse()
        .join('<br/>');

    document.getElementById('comments').innerHTML = commentsHTML;
    
    bindUpvoteEvents();
}