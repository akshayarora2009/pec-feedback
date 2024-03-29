'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const http = require('http');
const maindb = require('./maindb.js');

// read the template
const template = fs.readFileSync('templates/template.json',
                                    { 'encoding': 'utf8' }).toString();
const indexHtml = fs.readFileSync('index.html', { 'encoding': 'utf8' }).toString();
const indexFeedbackJs = fs.readFileSync('./app/feedback-form.js', { 'encoding' : 'utf8' }).toString();

function GetPostData(req, callback) {
    let whole = '';
    req.on('data', (chunk) => {
        // consider adding size limit here
        console.log(chunk.toString('utf8'));
        whole += chunk.toString('utf8');
    });

    req.on('end', () => {
        console.log(whole);
        callback(whole);
    });
}

let server = http.createServer((req, res) => {
    console.log(`request for ${req.url}`)
    let p = url.parse(req.url, true);

    if (p.pathname === '/') {
        server.sendHomePage(req, res);
    } else if (p.pathname.toString().includes('/app') 
        || p.pathname.toString().includes('/off')) {
        server.sendApp(p.pathname, req, res);
    } else if (p.pathname === '/courses') {
        server.sendCourseList(p, req, res);
    } else if (p.pathname === '/feedback') {
        server.sendFeedBackQuestions(p, req, res);
    } else if (p.pathname === '/record') {
        server.recordResponse(p, req, res);
    } else if (p.pathname === '/user') {
        server.sendUserInformation(p, req, res);
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.sendUserInformation = function(p, req, res) {
    if (req.method === 'POST') {
        GetPostData(req, function(data) {
            // getOptedCourses take sid and will return list of opted courses
            var sid = JSON.parse(data);
            let courseList = maindb.getOptedCourses({ 'sid': sid });
            courseList = JSON.stringify(courseList);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(courseList);
        });
    }
};

server.sendHomePage = function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(indexHtml);
};

server.sendApp = function(p, req, res) {
    p = path.join(__dirname, '/../' + p);
    console.log(new Date() + ': sending ' + p);

    if (!fs.existsSync(p)) {
        res.writeHead(404);
        res.end();
        return;
    } 

    let stream = fs.readFile(p, { 'encoding': 'utf8' }, (err, data) => {
        res.writeHead(200, {'Content-Type' : 'text/js' });
        res.end(data);
    });
    
};

server.sendCourseList = function(p, req, res) {
};

server.sendFeedBackQuestions = function(p, req, res) {
    let auth = p.query.auth;
    let courseid = p.query.courseid;
    let teacher = maindb.getInstructor({ 'auth': auth, 'courseid': courseid });
    let course = maindb.getCourse({'courseid' : courseid });

    let app = {};
    app.formTitle = 'Feedback Form';
    app.formDescription = 'Instructor: ' + teacher.name
                    + ', Course: ' + course.name + ', CourseID: ' + courseid;
    app.questionList = JSON.parse(template).map((question) => {
        return { type: question.questionType, question: question.question, options: question.options };
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(app));
}

server.recordResponse = function(p, req, res) {
    let whole = '';
    if (req.method == 'POST') {
        GetPostData(req, function(data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('Data received.');
            maindb.recordResponse(JSON.parse(data));
        });
    }
};

server.listen(8080);
