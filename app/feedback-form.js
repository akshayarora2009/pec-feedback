
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

var RadioButton = React.createClass({
    handleClick: function(event) {
        console.log(`You clicked ${this.props.text} with ${event.target.value}`);
    },

    render: function() {
        return (
            <div className='fb-radio-button'>
                <input type='radio' onChange={this.handleClick} value={this.props.text} />
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
                <RadioButton key={id++} text={a.toString()} />
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
        if (this.first_time) {
            val = val.substr(val.length - 1, val.length);
            this.first_time = false;
        }
        console.log(val);
        this.setState({value: val});
    },

    render: function() {
        return (
            <input type='text'
                value={this.state.value}
                onChange={this.handleChange}
            />
        );
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
        ];
    },
    render: function() {
        return (<QuestionList questionList={this.getQuestionList()} />);
    }
});


ReactDOM.render(<FeedBackForm />, document.getElementById('content'));
