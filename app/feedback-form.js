//
// - FeedBackForm
//    - QuestionList
//        - FeedBackQuestionBox
//            - QuestionText
//            - Answer
//                - RadioButtons
//                - LevelsBasedAnswer
//                - DescriptiveAnswer
//    - SubmitButton
//



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

// helper component for radioButtons
var RadioButton = React.createClass({
    render: function() {
        return (<input className='fb-radio' type='radio' value={this.props.option} />);
    }
});

// this.props.options is an array having all options
var RadioButtons = React.createClass({
    render: function() {
        var id = 1;
        var buttons = this.props.options.map((a) => {
            return (<RadioButton option={a.toString()} key={id++} />);
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
    render: function() {
        return (<input className='fb-textbox' type='text' />);
    }
});

var Answer = React.createClass({
    render: function() {
        switch (this.props.type) {
            case 'radio':
                return (<RadioButtons options={this.props.options ? this.props.options : []} />);
            case 'descriptive':
                return (<DescriptiveAnswer />);
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
                <Answer type={this.props.answerType} options={this.props.options} />
            </div>
        );
    }
});

var QuestionList = React.createClass({
    render: function() {
        var listNodes = this.props.questionList.map((question) => {
            return (<FeedBackQuestionBox
                        questionText={question.text} 
                        answerType={question.type}
                        options={question.type != "descriptive" ? question.options : null }
                    />);
        });

        return (
            <div className='fb-question-list'>
            {listNodes}
            </div>
        );
    }
});

var FeedBackForm = React.createClass({
    getQuestionList: function() {
        return [
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
                text: "How are you?",
                type: 'descriptive',
                options: []
            }
        ];
    },
    render: function() {
        return (<QuestionList questionList={this.getQuestionList()} />);
    }
});


ReactDOM.render(<FeedBackForm />, document.getElementById('content'));

