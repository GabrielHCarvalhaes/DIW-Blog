document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const repoId = params.get('id');

    if (repoId) {
        fetch(`https://api.github.com/repos/GabrielHCarvalhaes/${repoId}`)
            .then(response => response.json())
            .then(repo => {
                document.getElementById('repo-name').innerText = repo.name;
                document.getElementById('repo-description').innerText = repo.description;
                document.getElementById('repo-created').innerText = new Date(repo.created_at).toLocaleDateString();
                document.getElementById('repo-owner').innerText = repo.owner.login;
                document.getElementById('repo-url').href = repo.html_url;
                document.getElementById('repo-url').innerText = repo.html_url;
                document.getElementById('repo-language').innerText = repo.language;
                document.getElementById('repo-topics').innerText = repo.topics.join(', ');
                document.getElementById('repo-stars').innerText = repo.stargazers_count;
                document.getElementById('repo-watchers').innerText = repo.watchers_count;
                document.getElementById('repo-forks').innerText = repo.forks_count;
                document.getElementById('repo-license').innerText = repo.license ? repo.license.name : 'No license';
            });
    } else {
        document.getElementById('repo-details').innerText = 'Repositório não especificado.';
    }
});
