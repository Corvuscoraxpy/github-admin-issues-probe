import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import styles from './styles.css';

const {Grid, Row, Col} = require('react-flexbox-grid');

const { string, arrayOf, object, func} = PropTypes;
const propTypes = {
    username: string.isRequired,
    repositoryList: arrayOf(object.isRequired).isRequired,
    onChangeRepositoryOwner: func.isRequired,
    onSelectRepository: func.isRequired,
};

class RepoSelector extends Component {

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
        return (
            <Row className={styles['rowStyle']}>
                <Col sm={12}>
                    <TextField
                        value={repositoryOwner}
                        hintText="Select repository owner"
                        floatingLabelText="Select repository owner"
                        fullWidth={true}
                        onChange={this.handleChangeTextField}
                        onKeyDown={this.handleEnterKeyDownTxtFld}
                    />
                </Col>

                <Col sm={12}>
                    <SelectField
                        disabled={updateInProcess}
                        value={value}
                        floatingLabelText="Select the repository"
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


RepoSelector.propTypes = propTypes;

export default RepoSelector;
