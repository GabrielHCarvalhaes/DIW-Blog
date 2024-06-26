document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const repoName = params.get('repo');

    fetch(`https://api.github.com/repos/GabrielHCarvalhaes/${repoName}`)
        .then(response => response.json())
        .then(repo => {
            const repoDetails = document.getElementById('detalhes-repositorio');
            repoDetails.innerHTML = `
                <h2>${repo.name}</h2>
                <p>${repo.description}</p>
                <p>Data de criação: ${new Date(repo.created_at).toLocaleDateString()}</p>
                <p>Linguagem: ${repo.language}</p>
                <p><a href="${repo.html_url}" target="_blank">Acesse o repositório no GitHub</a></p>
                <div class="estatisticas-repo">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                </div>
            `;
        });
});