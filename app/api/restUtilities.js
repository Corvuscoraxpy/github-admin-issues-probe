
const api = {
    //  Authorization
    fetchAuthorization(username, password) {
        return fetch(`https://api.github.com/user`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Content-Type": 'application/json',
                "Authorization": "Basic " + btoa(`${username}:${password}`)
            },
        })
        .then(res => {
            if(res.status !== 200) {
                throw Error('Incorrect username or password');
            }
            return res.json();
        });
    },

    fetchSingleUser(username, authorization) {
        return fetch(`https://api.github.com/users/${username}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Content-Type": 'application/json',
                "Authorization": authorization,
            },
        })
        .then(res => {
            if(res.status !== 200) {
                throw Error('User does not exist');
            }
            return res.json();
        })
    },

    //  Fetch list user repository
    fetchListUserRepositories(repoOwner, authorization) {
        return fetch(`https://api.github.com/users/${repoOwner}/repos`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Content-Type": 'application/json',
                "Authorization": authorization,
            },
        })
        .then(res => {
            if(res.status !== 200) {
                throw Error('Bad validation');
            }
            return res.json();
        });
    },

    //  Fetch issues for a repository
    fetchIssueForRepository(authorization, repoOwner, repo) {
        const url = new URL(`https://api.github.com/repos/${repoOwner}/${repo}/issues`),
        params = {state:'all', per_page: 50, page: 1};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authorization,
            },
        });
    },

    // Fetch issues by pagination links
    fetchIssuesPerPage(authorization, paginationUrl) {
        return fetch(paginationUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authorization,
            },
        });
    },

    //  Get a single issue
    fetchSingleIssue(authorization, repoOwner, repo, issueNumber) {
        return fetch(`https://api.github.com/repos/${repoOwner}/${repo}/issues/${issueNumber}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authorization,
            },
        })
        .then(result => {
            if (result.status !== 200) {
                throw Error('Error, ', result.status);
            }
            return result.json();
        });
    },

    //Fetch comments on an issue
    fetchListCommentsOnAnIssue(authorization, comments_url) {
        return fetch(`${comments_url}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authorization,
            },
        })
        .then(res =>{
            if(res.status !== 200) {
                throw Error('Bad validation');
            }
            return res.json();
        });
    },

    //  Delete label for repository
    deleteLabel(authorization, repoOwner, repo, name) {
        return fetch(`https://api.github.com/repos/${repoOwner}/${repo}/labels/${name}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
        });
    },

    updateLabel(authorization, labelUrl, newName, newColor) {
        return fetch(labelUrl, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            body: JSON.stringify({name: newName, color: newColor})
        });
    },


    createLabel(authorization, repoOwner, repo, name, color) {
        return fetch(`https://api.github.com/repos/${repoOwner}/${repo}/labels`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            body: JSON.stringify({name, color})
        });
    },

    //  Add labels to an issue
    addLabelsToAnIssue(authorization, repoOwner, repo, number, labelsToAdd) {
        return fetch(`https://api.github.com/repos/${repoOwner}/${repo}/issues/${number}/labels`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            body: JSON.stringify(labelsToAdd)
        });
    },

    // Remove a label from an issue
    removeLabelFromAnIssue(authorization, repoOwner, repo, number, name) {
        return fetch(`https://api.github.com/repos/${repoOwner}/${repo}/issues/${number}/labels/${name}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
        });
    },

    //Fetch labels for repository
    fetchListLabelsForRepository(authorization, repoOwner, repo) {
        return fetch(`https://api.github.com/repos/${repoOwner}/${repo}/labels`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authorization,
            },
        })
        .then(res => {
            if(res.status !== 200) {
                throw Error('Bad validation');
            }
            return res.json();
        });
    },


    fetchPostIssue() {
        var newIssue = {title: "Found a bug", body: "Nam nam nam"};
        return fetch(`https://api.github.com/repos/Corvuscoraxpy/My-blog/issues`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": 'application/json',
                "Authorization": "Basic " + btoa("user:password"),
            },
            body: JSON.stringify(newIssue)

        }).then(res => console.log(res.json()));
    }
}

module.exports = api;
