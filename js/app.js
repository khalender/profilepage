class Profile {

    constructor(profile) {
        this.id = '';
        this.name = '';
        this.imageUrl = '';
        this.reposUrl = '';
        this.bio = '';
    }

    getProfile(username) {
        const url = `https://api.github.com/users/${username}`;

        var myHeaders = new Headers();


        var requestOptions = {
            method: 'GET',
        };

        return fetch(url, requestOptions)
            .then((data) => data.json())
            .then((data) => {
                this.id = data.id;
                this.name = data.name;
                this.imageUrl = data.avatar_url;
                this.bio = data.bio;
                this.reposUrl = data.repos_url;
                console.log(data);
                return data;
            })

            .then(() => this.renderPicture())
            .catch(() => { })

    }


    renderPicture() {
        const pictureContainer = document.getElementById('pic');

        const name = document.createElement('h3');
        const image = document.createElement('img');

        name.innerHTML = this.name;
        image.setAttribute('src', this.imageUrl);
        image.style.width = "100%";
        image.style.height = "auto";


        pictureContainer.appendChild(image);
        pictureContainer.appendChild(name);

        return pictureContainer;
    }

    renderRouter(container) {

        const routerContainer = document.getElementById('root');
        routerContainer.innerHTML = '';
        routerContainer.append(container);


    }

    renderHome() {
        console.log('bio: ' + this.bio);
        const container = document.createElement('div');
        const textEl = document.createElement('p');
        textEl.innerHTML = this.bio;
        container.append(textEl);
        return container;
    }

    renderRepos() {
        const url = this.reposUrl;
        return fetch(url)
            .then((data) => data.json())
            .then((data) => {
                return data.map(data => ({ name: data.name, url: data.html_url, description: data.description }))
            })
            .then(x => new Promise(resolve => setTimeout(() => resolve(x), 1000))) /// intentionally delay 2 sec
            .then((repos) => {
                const container = document.createElement('div');
                const listEl = document.createElement('ul');
                listEl.classList.add("list");

                container.appendChild(listEl);
                console.log("repos " + JSON.stringify(repos));
                repos.forEach(repo => {
                    console.log("each repo " + JSON.stringify(repo));
                    const rowEl = document.createElement('li');
                    const icon = document.createElement('i');
                    icon.setAttribute('class', "fa fa-github fa-3x");
                    rowEl.appendChild(icon);
                    let repoProps = Object.keys(repo);
                    repoProps.forEach(key => {
                        const columnEl = document.createElement('div');
                        columnEl.innerHTML = repo[key];
                        rowEl.appendChild(columnEl);

                    });
                    listEl.appendChild(rowEl);

                })
                container.appendChild(listEl);
                return container;
            });
    }
    renderLoading() {
        const container = document.createElement('div');
        container.classList.add("loading");
        const icon = document.createElement('i');
        icon.setAttribute('class', "fa fa-spinner fa-pulse fa-3x fa-fw");
        container.appendChild(icon);

    return container;



    }

    handleHomeClick() {
        this.renderRouter(this.renderHome());
    }

    handleSkillsClick() {
        // could not be completed
    }

    handleGitHubRepoClick() {
        this.renderRouter(this.renderLoading());
        this.renderRepos().then((container) =>
            this.renderRouter(container)
        )


    }
    handleWorksClick() {
        //could not be completed
    }

}
