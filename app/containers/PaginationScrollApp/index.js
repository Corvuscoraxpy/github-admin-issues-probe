import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getPagination, getActiveTab } from 'containers/RepoIssues/selectors';
import App from 'components/App';


class PaginationScrollApp extends Component {

    render() {
        const { pagination, activeTab } = this.props;
        return (
            <App
                activeTab={activeTab}
                pagination={pagination}
                onFetchIssuePerPage={this.onFetchIssuePerPage}
            />
        );
    }

    onFetchIssuePerPage = (paginationUrl) => {
        const { fetchIssuePerPageAction } = this.props;
        fetchIssuePerPageAction(paginationUrl);
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
    pagination: getPagination(),
    activeTab: getActiveTab(),
});


export default connect(mapStateToProps, mapDispatchToProps)(PaginationScrollApp);
