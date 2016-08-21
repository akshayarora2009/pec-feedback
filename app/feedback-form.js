 // - CourseOptions
 //    - CourseOption

// - FeedBackForm
//    - QuestionList
//        - FeedBackQuestionBox
//            - QuestionText
//            - Answer
//                - RadioButtons
//                - LevelsBasedAnswer
//                - DescriptiveAnswer
//    - SubmitButton
var CourseOptions = React.createClass({
    handleChange: function(event) {
        this.setState({value: event.target.value});
        renderFeedBackPage(event.target.value);
    },
    render: function() {
        var options = this.props.courses.map((course) => {
            return (
                <option value={course.name} key={course.id}>{course.name}</option>
            );
        });
        return (
            <select value='Select Course' onChange={this.handleChange} >
                {options}
            </select>
        );
    }
});

const quesSuffix = 'question-'; 
var results = {};
var courses = [];

var RadioButton = React.createClass({
    handleClick: function(event) {
        results[this.props.questionId] = event.target.value;
    },

    render: function() {
        return (
            <div className='fb-radio-button'>
                <input type='radio' name={'fb-' + this.props.questionId}
                    onChange={this.handleClick} value={this.props.text}
                />
                {this.props.text}
            </div>
        )
    }
});
// this.props.options is an array having all options
var RadioButtons = React.createClass({
    render: function() {
        var id = 1;
        var buttons = this.props.options.map((a) => {
            return (
                <RadioButton key={id++} text={a.toString()}
                    questionId={this.props.questionId}
                />
            );
        });

        return (
            <div className="fb-buttons">
                { buttons}
            </div>
        );
    }
});


// var LevelsBasedAnswer = React.createClass({
//
// });

var DescriptiveAnswer = React.createClass({
    getInitialState: function() {
        this.first_time = true;
        return { value: 'Enter text...' }
    },

    handleChange: function(event) {
        var val = event.target.value;
        this.setState({value: val});
        results[this.props.questionId] = val;
    },

    render: function() {
        return (
            <input type='text'
                placeholder='enter'
                onChange={this.handleChange}
            />
        );
    }
});

var Answer = React.createClass({
    render: function() {
        switch (this.props.type) {
            case 'radio':
                return (<RadioButtons
                            options={this.props.options ? this.props.options : []}
                            questionId={this.props.questionId}
                        />);
            case 'descriptive':
                return (<DescriptiveAnswer questionId={this.props.questionId} />);
            default:
                throw new TypeError('unknown type of answer');
        }
    }
});

var QuestionText = React.createClass({
    render: function() {
        return (<p className='fb-question-text'>{this.props.text}</p>);
    }
});

var FeedBackQuestionBox = React.createClass({
    render: function() {
        return (
            <div className='fb-question-box'>
                <QuestionText text={this.props.questionText} />
                <Answer
                    type={this.props.answerType}
                    options={this.props.options}
                    questionId={this.props.questionId}
                />
            </div>
        );
    }
});

var QuestionList = React.createClass({
    render: function() {
        var listNodes = this.props.questionList.map((question, id) => {
            return (<FeedBackQuestionBox
                        questionText={question.question} 
                        answerType={question.type}
                        options={question.type != "descriptive" ? question.options : null }
                        key={'question-' + id}
                        questionId={'question-' + id}
                    />);
        });

        return (
            <div className='fb-question-list'>
            {listNodes}
            </div>
        );
    }
});

var SubmitButton = React.createClass({
    // handleSubmit: function(e) {

    // },
    render: function() {
        return <input className='fb-submit-button' type='submit' value='Submit' />
    }
});

// FeedBackFormHeading
//      - FormTitle
//      - FormDescription
var FormTitle = React.createClass({
    render: function() {
        return <h1 className='fb-title'>{this.props.formTitle}</h1>;
    }
});

var FormDescription = React.createClass({
    render: function() {
        return (
            <p className='fb-description'>{this.props.formDescription}</p>
        )
    }
});

var FeedBackFormHeader = React.createClass({
    render: function() {
        return (
            <div className='fb-header'>
                <FormTitle formTitle={this.props.formTitle} />
                <FormDescription formDescription={this.props.formDescription} />
            </div>
        );
    }
});

var FeedBackForm = React.createClass({
    // getData: function() {
    //     return {
    //         formTitle: 'Feedback Form',
    //         formDescription: 'A simple feedback form written in react',
    //         questionList: [
    //             {
    //                 text: "How are you?",
    //                 type: 'radio',
    //                 options: [
    //                     "great!",
    //                     "bad!",
    //                     "don't want to tell"
    //                 ]
    //             },
    //             {
    //                 text: "What are you doing?",
    //                 type: 'descriptive',
    //                 options: []
    //             },
    //             {
    //                 text: "rate this website",
    //                 type: 'radio',
    //                 options: [
    //                     '1',
    //                     '2',
    //                     '3',
    //                     '4'
    //                 ]
    //             },
    //             {
    //                 text: 'Are you a gamer?',
    //                 type: 'radio',
    //                 options: [
    //                     'yes',
    //                     'no'
    //                 ]
    //             }
    //         ]
    //     };
    // },

    handleSubmit: function(e) {
        e.preventDefault();
        console.log(results);

        var url = '/record';
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(results),
        }).done((data) => {
            console.log(data);
        }).fail(() => {
            console.log('error');
        })
    },
    render: function() {
        var data = this.props.data;
        return (
            <div className='fb-form'>
                <FeedBackFormHeader formTitle={data.formTitle} formDescription={data.formDescription} />
                <form className='feedback-form' onSubmit={this.handleSubmit} >
                    <QuestionList questionList={data.questionList} />
                    <SubmitButton />
                </form>
            </div>
        );
    }
});

function getCourses() {
    return [
        {
            "id": "CSN201",
            "name": "Computer Science"
        },
        {
            "id": "CSN203",
            "name": "Computer Science 2"
        },
        {
            "id": "CSN204",
            "name": "Computer Science 3"
        },
        {
            "id": "CSN205",
            "name": "Computer Science 4"
        }
    ]
}

function getAuthToken() {
    return '14103088';
}

function renderFeedBackPage(course) {
    var i;
    for (var j in courses) {
        if (courses[j].name === course) {
            i = j;
            break;
        }
    }

    var url = '/feedback?auth=' + getAuthToken() + '&courseid=' + courses[i].id;
    $.ajax({
        dataType: 'json',
        url: url,
    }).done(function(data) {
        console.log('Got data', data);
        ReactDOM.render(<FeedBackForm data={data} />, document.getElementById('content'));
    }).fail(function(data) {
        console.log('could not get data');
    });
}

ReactDOM.render(<CourseOptions courses={courses = getCourses()} />, document.getElementById('content'));
