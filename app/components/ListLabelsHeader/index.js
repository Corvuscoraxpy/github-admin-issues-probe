import React, {Component, PropTypes} from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import FlatButton from 'material-ui/FlatButton';
import EditLabelForm from 'components/EditLabelForm';
const {Grid, Row, Col} = require('react-flexbox-grid');

export default class ListLabelsHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showEditForm: false,
        };
    }

    render() {
        const styles = {
            rowStyle: {
                padding: 0,
                margin: '20px 0px 20px 0px'
            },
            flatButton: {
                color: 'white'
            }
        }
        const { updateInProcess, handleCreateLabel } = this.props;
        return (
            <div>
                {this.state.showEditForm === false ?

                    <Row style={styles.rowStyle}>
                        <Col sm={6}>
                        {/* loading or ready. */}
                            <div style={{position: 'relative'}}>
                                <RefreshIndicator
                                    size={40}
                                    left={-20}
                                    top={0}
                                    status={updateInProcess ? "loading" : "ready"}
                                    style={{marginLeft: '50%'}}
                                />
                            </div>
                        </Col>
                        <Col sm={6} style={{textAlign: 'center'}}>
                            <FlatButton
                                style={styles.flatButton}
                                backgroundColor="#17a88c"
                                hoverColor="#1abc9c"
                                label="New Label"
                                onTouchTap={this.handleTouchNewLabel}
                            />
                        </Col>
                    </Row> :

                    <EditLabelForm
                        editing={false}
                        label={{name: '', color: ''}}
                        handleCreateLabel={handleCreateLabel}
                        onCancleEdit={this.onCancleEdit}
                    />
                }
            </div>
        );
    }

    onCancleEdit = () => {
        this.setState({
            showEditForm: false,
        });
    }

    handleTouchNewLabel = () => {
        this.setState({
            showEditForm: true,
        });
    }

}

ListLabelsHeader.propTypes = {
    updateInProcess: PropTypes.bool,
    handleCreateLabel: PropTypes.func,

};
