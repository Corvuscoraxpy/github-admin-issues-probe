const api = {
  getBio() {
    var url = `https://api.github.com/repos/Corvuscoraxpy/My-blog/issues`;
    return fetch(url).then((res) => res.json())
  },
  // fetchSendIssue() {
  //   var auth = btoa("Corvuscoraxpy:Coraxcorv8");
  //    return fetch(`https://api.github.com/repos/Corvuscoraxpy/My-blog/issues`, {
  //        method: 'POST',
  //        headers: {
  //          'Accept': 'application/json',
  //          'Content-Type': 'application/json',
  //          'Authorization': "token 69f1db18507a5a9b260fb05a63dd85c1973f440a",
  //        },
  //        title: 'New bug',
  //        body: 'Some content',
  //        assignee: 'Corvuscoraxpy',
  //        labels: 'bug'
  //    });
  //
  //  },

   fetchAuthorization(username, password) {
      return fetch(`https://api.github.com/user`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            "Content-Type": 'application/json',
            "Authorization": "Basic " + btoa(`${username}:${password}`)
          },
      });
    },

    fetchListYourRepositories(username, password) {
      return fetch(`https://api.github.com/user/repos`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          "Content-Type": 'application/json',
          "Authorization": "Basic " + btoa(`${username}:${password}`)
        },
      });
    },

    fetchIssueForRepository(owner, repo) {
      return fetch(`https://api.github.com/repos/${owner}/${repo}/issues`,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
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
