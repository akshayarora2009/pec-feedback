
// - FeedBackForm
//    - QuestionList
//        - FeedBackQuestionBox
//            - QuestionText
//            - Answer
//                - RadioButtons
//                - LevelsBasedAnswer
//                - DescriptiveAnswer
//    - SubmitButton




// +------------------------------------------------------+
// |  FeedBackForm                                        |
// |                                                      |
// |      +--------------------------------------+        |
// |      | QuestionList                         |        |
// |      |                                      |        |
// |      |   +----------------------------+     |        |
// |      |   |   FeedBackQuestionBox      |     |        |
// |      |   |                            |     |        |
// |      |   | +------------------------+ |     |        |
// |      |   | | QuestionText           | |     |        |
// |      |   | +------------------------+ |     |        |
// |      |   |                            |     |        |
// |      |   | +------------------------+ |     |        |
// |      |   | | Answer                 | |     |        |
// |      |   | |                        | |     |        |
// |      |   | | +-------------------+  | |     |        |
// |      |   | | |  RadioButtons     |  | |     |        |
// |      |   | | +-------------------+  | |     |        |
// |      |   | |          or            | |     |        |
// |      |   | | +-------------------+  | |     |        |
// |      |   | | | LevelsBasedAnswer |  | |     |        |
// |      |   | | +-------------------+  | |     |        |
// |      |   | |          or            | |     |        |
// |      |   | | +-------------------+  | |     |        |
// |      |   | | | DescriptiveAnswer |  | |     |        |
// |      |   | | +-------------------+  | |     |        |
// |      |   | +------------------------+ |     |        |
// |      |   |                            |     |        |
// |      |   +----------------------------+     |        |
// |      |                                      |        |
// |      +--------------------------------------+        |
// +------------------------------------------------------+

const quesSuffix = 'question-'; 
var results = {};

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
        return (<h2 className='fb-question-text'>{this.props.text}</h2>);
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
                        questionText={question.text} 
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
    getData: function() {
        return {
            formTitle: 'Feedback Form',
            formDescription: 'A simple feedback form written in react',
            questionList: [
                {
                    text: "How are you?",
                    type: 'radio',
                    options: [
                        "great!",
                        "bad!",
                        "don't want to tell"
                    ]
                },
                {
                    text: "What are you doing?",
                    type: 'descriptive',
                    options: []
                },
                {
                    text: "rate this website",
                    type: 'radio',
                    options: [
                        '1',
                        '2',
                        '3',
                        '4'
                    ]
                },
                {
                    text: 'Are you a gamer?',
                    type: 'radio',
                    options: [
                        'yes',
                        'no'
                    ]
                }
            ]
        };
    },

    handleSubmit: function(e) {
        e.preventDefault();
        console.log(results);
    },
    render: function() {
        var data = this.getData();
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


ReactDOM.render(<FeedBackForm />, document.getElementById('content'));
