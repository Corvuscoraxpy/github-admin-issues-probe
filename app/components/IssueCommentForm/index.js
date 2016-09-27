import React, { Component, PropTypes } from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import EditorTitle from 'material-ui/svg-icons/editor/title';
import EditorFormatBold from 'material-ui/svg-icons/editor/format-bold';
import EditorFormatItalic from 'material-ui/svg-icons/editor/format-italic';
import EditorFormatQuote from 'material-ui/svg-icons/editor/format-quote';
import EditorInsertLink from 'material-ui/svg-icons/editor/insert-link';
import EditorFormatListBulleted from 'material-ui/svg-icons/editor/format-list-bulleted';
import EditorFormatListNumbered from 'material-ui/svg-icons/editor/format-list-numbered';
import ActionCode from 'material-ui/svg-icons/action/code';
import styles from 'components/Issue/styles.css';
import { colorLuminance, rawMarkup } from '../../api/format.js';
const {Grid, Row, Col} = require('react-flexbox-grid');


const { object, func } = PropTypes;
const propTypes = {
    userData: object.isRequired,
    createCommentToIssue: func.isRequired,
};

class IssueCommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: '',
            expanded: false,
        };
    }
    render() {
        const { userData } = this.props;

        return (
            <Card
                expanded={this.state.expanded}
                onExpandChange={this.handleExpandChange}
                className={styles['card']}
                style={{marginBottom: '100px'}}
            >
                <CardHeader
                    title={userData.login}
                    avatar={
                        <a href={userData.html_url} target="_blank">
                            <Avatar src={userData.avatar_url} />
                        </a>
                    }
                />
                <CardText expandable={true}>
                    <span
                        className={styles['span-card-text']} dangerouslySetInnerHTML={rawMarkup(this.state.commentText)}
                    />
                </CardText>
                <CardActions>
                    <Row style={{margin: 0}}>
                        <Col sm={6} style={{position: 'relative'}}>
                            <Toggle
                                toggled={this.state.expanded}
                                onToggle={this.handleToggle}
                                labelPosition="right"
                                elementStyle={{backgroundColor: '#173e43'}}
                                label="Preview"
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    paddingTop: '12px',
                                    paddingBottom: '12px',
                                }}
                            />
                        </Col>
                        <Col sm={6} style={{padding: 0}}>
                            <div style={{float: 'right', padding: 0}}>
                                <IconMenu
                                    iconButtonElement={
                                        <IconButton
                                            tooltipPosition="top-center"
                                            tooltip="Add header text"
                                        >
                                            <EditorTitle hoverColor="#3fb0ac"/>
                                        </IconButton>}
                                    onChange={this.handleHeaderRequestChange}
                                    animated={false}
                                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                    menuStyle={{margin: 0}}
                                >
                                    <MenuItem
                                        value="h1"
                                        primaryText={
                                            <h1 style={{margin: 0}}>
                                                Header
                                            </h1>
                                        }
                                    />
                                    <MenuItem
                                        value="h2"
                                        primaryText={
                                            <h2 style={{margin: 0}}>
                                                Header
                                            </h2>
                                        }
                                    />
                                    <MenuItem
                                        value="h3"
                                        primaryText={
                                            <h3 style={{margin: 0}}>
                                                Header
                                            </h3>
                                        }
                                    />
                                </IconMenu>
                                <IconButton
                                    onTouchTap={this.handleTouchAddBold}
                                    tooltipPosition="top-center"
                                    tooltip="Add bold text"
                                >
                                    <EditorFormatBold hoverColor="#3fb0ac" />
                                </IconButton>
                                <IconButton
                                    onTouchTap={this.handleTouchAddItalic}
                                    tooltipPosition="top-center"
                                    tooltip="Add italic text"
                                >
                                    <EditorFormatItalic hoverColor="#3fb0ac" />
                                </IconButton>
                                <IconButton
                                    onTouchTap={this.handleTouchIsertQuote}
                                    tooltipPosition="top-center"
                                    tooltip="Insert a quote"
                                >
                                    <EditorFormatQuote hoverColor="#3fb0ac" />
                                </IconButton>
                                <IconButton
                                    onTouchTap={this.handleTouchInsertCode}
                                    tooltipPosition="top-center"
                                    tooltip="Insert code"
                                >
                                    <ActionCode  hoverColor="#3fb0ac" />
                                </IconButton>
                                <IconButton
                                    onTouchTap={this.handleTouchAddLink}
                                    tooltipPosition="top-center"
                                    tooltip="Add a link"
                                >
                                    <EditorInsertLink hoverColor="#3fb0ac" />
                                </IconButton>
                                <IconButton
                                    onTouchTap={this.handleTouchAddBulletedList}
                                    tooltipPosition="top-center"
                                    tooltip="Add a bulleted list"
                                >
                                    <EditorFormatListBulleted hoverColor="#3fb0ac" />
                                </IconButton>
                                <IconButton
                                    onTouchTap={this.handleTouchAddNumberedList}
                                    tooltipPosition="top-left"
                                    tooltip="Add a numbered list"
                                >
                                    <EditorFormatListNumbered hoverColor="#3fb0ac" />
                                </IconButton>
                            </div>
                        </Col>
                    </Row>
                </CardActions>
                <CardText className={styles['card-text']}>
                    <TextField
                        id="commentField"
                        value={this.state.commentText}
                        hintText="Comment"
                        floatingLabelText="Leave a comment"
                        floatingLabelStyle={{color: '#3fb0ac'}}
                        underlineStyle={{borderColor: '#173e43'}}
                        underlineFocusStyle={{borderColor: '#173e43' }}
                        multiLine={true}
                        fullWidth={true}
                        onChange={this.handleChange}
                        ref={me => this.commentField = me}
                    />
                </CardText>
                <CardActions>
                    <a
                        target='_blank'
                        href="https://guides.github.com/features/mastering-markdown/"
                        style={{
                            marginTop: '16px',
                            paddingLeft: '8px',
                            float: 'left',
                            textDecoration: 'none',
                            color: '#E0E0E0'
                        }}
                    >
                        Styling with Markdown is supported
                    </a>
                    <FlatButton
                        style={{color: '#3fb0ac', float: 'right', marginTop: '16px'}}
                        label="Comment"
                        hoverColor={colorLuminance('#173e43', 0.2)}
                        rippleColor={'#fae596'}
                        backgroundColor={'#173e43'}
                        onTouchTap={this.handleTouchComment}
                    />
                </CardActions>
            </Card>
        );
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };

    handleToggle = (event, toggle) => {
        this.setState({expanded: toggle});
    };


    handleChange = (event) => {
        this.setState({
            commentText: event.target.value,
        });
    };

    handleTouchComment = () => {
        const { createCommentToIssue } = this.props;
        createCommentToIssue(this.state.commentText);
        this.setState({commentText: ''});
    };

    insertAtCursor = (myValue) => {
        const commentField = document.getElementById('commentField');
        const selectionStart = commentField.selectionStart;
        const selectionEnd = commentField.selectionEnd;
        const offset = myValue[0].length;
        this.setState({
            commentText: this.state.commentText.substring(0, selectionStart)
                + myValue[0] + this.state.commentText.substring(selectionStart, selectionEnd)
                + myValue[1] + this.state.commentText.substring(selectionEnd, this.state.commentText.length),
        });
        setTimeout(() => commentField.focus(), 0);
        setTimeout(() => {
            commentField
                .setSelectionRange(selectionStart + offset || 0, selectionEnd + offset || 0);
        }, 0);
    };

    handleHeaderRequestChange = (event, value) => {
        console.log(typeof value);
        switch(value) {
            case 'h1':
                this.insertAtCursor(['# ', '']);
                break;
            case 'h2':
                this.insertAtCursor(['## ', '']);
                break;
            case 'h3':
                this.insertAtCursor(['### ', ''])
                break;
        }
    };

    handleTouchInsertCode = () => {
        this.insertAtCursor(['\`', '\`']);
    };

    handleTouchAddItalic = () => {
        this.insertAtCursor(['_', '_']);
    };

    handleTouchAddBold = () => {
        this.insertAtCursor(['**', '**']);
    };

    handleTouchIsertQuote = () => {
        this.insertAtCursor(['\n\n> ', '\n'])
    };

    handleTouchAddLink = () => {
        this.insertAtCursor(['[', '](url)']);
    };

    handleTouchAddBulletedList = () => {
        const commentField = document.getElementById('commentField'),
            selectionStart = commentField.selectionStart,
            selectionEnd = commentField.selectionEnd;
        if (selectionEnd - selectionStart !== 0) {
            let selectedTextLines =
                this.state.commentText.substring(selectionStart, selectionEnd).split('\n');
            let resultString = '';
            let countOfLines = selectedTextLines.length;
            let offset = countOfLines * 2;
            selectedTextLines.forEach(line => {
                resultString += '- ' + line + '\n';
            });
            this.setState({
                commentText: this.state.commentText.substring(0, selectionStart)
                + resultString
                + this.state.commentText.substring(selectionEnd, this.state.commentText.length),
            });
            setTimeout(() => commentField.focus(), 0);
            setTimeout(() => {
                commentField
                    .setSelectionRange(selectionStart, selectionEnd + offset);
            }, 0);
        } else {
            this.insertAtCursor(['\n\n- ', '']);
        }
    };

    handleTouchAddNumberedList = () => {
        const commentField = document.getElementById('commentField'),
            selectionStart = commentField.selectionStart,
            selectionEnd = commentField.selectionEnd;
        if (selectionEnd - selectionStart !== 0) {
            let selectedTextLines =
                this.state.commentText.substring(selectionStart, selectionEnd).split('\n');
            let resultString = '';
            let countOfLines = selectedTextLines.length;
            let offset = countOfLines * 3;
            selectedTextLines.forEach((line, index) => {
                resultString += ++index + '. ' + line + '\n';
            });
            this.setState({
                commentText: this.state.commentText.substring(0, selectionStart)
                + resultString
                + this.state.commentText.substring(selectionEnd, this.state.commentText.length),
            });
            setTimeout(() => commentField.focus(), 0);
            setTimeout(() => {
                commentField
                    .setSelectionRange(selectionStart, selectionEnd + offset);
            }, 0);

        } else {
            this.insertAtCursor(['\n\n1. ', '']);
        }
    };
}

IssueCommentForm.propTypes = propTypes;
export default IssueCommentForm;
