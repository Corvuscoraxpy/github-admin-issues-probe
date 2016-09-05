import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const {Grid, Row, Col} = require('react-flexbox-grid');


export default class RepoSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // value of SelectField
            value: null,
            repositoryOwner: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        const { onChangeRepositoryOwner } = this.props;
        const { repositoryOwner } = this.state;
        if (repositoryOwner === '') {
            this.setState({ repositoryOwner: nextProps.username});
            onChangeRepositoryOwner(nextProps.username);
        }
    }

    render() {
        const styles = {
            rowStyle : {
                padding: 0,
                margin: 0,
            },
            floatingLabelStyle: {
                color: 'orange',
            },
        }
        const { repositoryList, updateInProcess } = this.props;
        const listNodes = repositoryList.map((repoObj, index) => {
            return (
                <MenuItem
                    primaryText={repoObj.name}
                    value={repoObj.name}
                    key={index}
                />
            );
        });
        const { repositoryOwner, value } = this.state;
        console.log('updt status: ', updateInProcess);
        return (
            <Row style={styles.rowStyle}>
                <Col sm={4}>
                    <TextField
                        value={repositoryOwner}
                        hintText="Repository owner"
                        floatingLabelText="Select owner"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        fullWidth={true}
                        onChange={this.handleChangeTextField}
                        onKeyDown={this.handleEnterKeyDownTxtFld}
                    />
                </Col>
                <Col sm={8}>
                    <SelectField
                        disabled={updateInProcess}
                        value={value}
                        floatingLabelText="Select the repository"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        fullWidth={true}
                        onChange={this.handleChangeSelectField}
                     >
                        {listNodes}
                    </SelectField>
                </Col>
            </Row>
        );
    }

    // Select repository from SelectField
    handleChangeSelectField = (event, index, value) => {
        const { onSelectRepository } = this.props;
        this.setState({value});
        onSelectRepository(value);
    };

    handleChangeTextField = (e) => {
        this.setState({
            repositoryOwner: e.target.value,
        });
    }

    handleEnterKeyDownTxtFld = (e) => {
        const { onChangeRepositoryOwner } = this.props;
        const { repositoryOwner } = this.state;
        // if pressed Enter
        if(e.keyCode == 13) {
            onChangeRepositoryOwner(repositoryOwner);
        }
    }
}

RepoSelector.propTypes = {
    username: PropTypes.string.isRequired,
    repositoryList: PropTypes.array.isRequired,
    onChangeRepositoryOwner: PropTypes.func.isRequired,
    onSelectRepository: PropTypes.func.isRequired,
}
