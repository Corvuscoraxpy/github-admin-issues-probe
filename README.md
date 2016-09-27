# github-admin-issues-probe
![screenshot](https://github.com/proficiat/github-admin-issues-probe/blob/master/2016-09-28.png)

***For learning purposes only***

This repo is a seed project for creating a simple issues administration app for a specified GH repository.
UI should be made with Material UI components. Please find a Material UI component usage in `HomePage` component.

#### The problem:

* Ask user about what GH repository issues he wants to administer. (User should enter login and password in order to have the access to entered repo).
* Check if the user is an owner of entered repository, if not - throw/show an error.
* Load all issues of the repository. List of the issue names should occupy only 40% of the entire page. The rest is reserved for issue's text.
* Clicking on an issue's name in the list user can read the text of the issue.
* User should have the ability to review, change and add any label on the selected issue.

The resolution of this task may seem to be very simple.
But taking in account the missing of any REST/AJAX methods or utilities, it is rather complex thing to implement and organise API calls properly and integrate them into UI architecture.

## Getting Started

* Clone project into an empty folder being in that folder:
```
git clone https://github.com/Corvuscoraxpy/github-admin-issues-probe.git
```

* Change to created directory after cloning (github-admin-issues-probe):

```
cd github-admin-issues-probe
```

* Install deps

```
npm install
```

* Start server in the development mode:

```
npm run start
```

* Go to the following address in the browser:

```
http://localhost:3000
```
