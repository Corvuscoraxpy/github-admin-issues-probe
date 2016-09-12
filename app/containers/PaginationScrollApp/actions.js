import { setPaginationAction, appendPageToIssuesList } from 'containers/RepoDataLoader/actions';

const api = require("../../api/restUtilities.js");
const parse = require('parse-link-header');

export const fetchIssuePerPageAction = (paginationUrl) => {
    return (dispatch, getState) => {
        const authorization = getState().get('authorization').authorization;
        api.fetchIssuesPerPage(authorization, paginationUrl)
            .then(response => {
                if(response.status !== 200) {
                    throw Error('Bad validation');
                }
                let parsedLink = parse(response.headers.get('Link'));
                dispatch(setPaginationAction(parsedLink));
                return response.json();
            })
            .then(res => {
                dispatch(appendPageToIssuesList(res));
            })
            .catch(err => console.log(err));
    }
}
