exports.getOptedCourses = function(sid) {
    return [
        {
            "courseid": "CSN201",
            "name": "Computer Science"
        },
        {
            "courseid": "CSN203",
            "name": "Computer Science 2"
        },
        {
            "courseid": "CSN204",
            "name": "Computer Science 3"
        },
        {
            "courseid": "CSN205",
            "name": "Computer Science 4"
        }

    ]
};

exports.getInstructor = function(query) {
    return { 'name': 'Prince Dhaliwal', 'TeacherId': 1 };
}

exports.getCourse = function(cid) {
    return { 'name': 'Computer Science 2'};
}
