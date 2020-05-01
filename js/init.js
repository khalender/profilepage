
const init = () => {

    window.addEventListener('load', () => {
        const router = document.getElementById("root");
        const profile = new Profile();
        profile
        .getProfile('khalender')
        .then((a)=> profile.handleHomeClick().apply(profile)); //this is also binding but occurs one time. 
        
        


        const home = document.getElementById('home');
        const skills = document.getElementById('skills');
        const githubrepos = document.getElementById('githubrepos');
        const works = document.getElementById('works');

        const handleHome = profile.handleHomeClick.bind(profile); /// finally i could use binding. 
        home.addEventListener('click',handleHome);
        skills.addEventListener('click', profile.handleSkillsClick());
        const handleRepos = profile.handleGitHubRepoClick.bind(profile);
        githubrepos.addEventListener('click', handleRepos);
        works.addEventListener('click', profile.handleWorksClick());

    }

    );
}

init();