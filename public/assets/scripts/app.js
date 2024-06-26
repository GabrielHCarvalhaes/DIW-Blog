document.addEventListener('DOMContentLoaded', () => {
    // Carregar informações do usuário do GitHub
    fetch('https://api.github.com/users/GabrielHCarvalhaes')
        .then(response => response.json())
        .then(data => {
            document.getElementById('profile-image').src = data.avatar_url;
            document.getElementById('profile-name').innerText = data.name;
            document.getElementById('profile-bio').innerText = data.bio;
            document.getElementById('profile-location').innerText = data.location || 'Não informado';
            document.getElementById('profile-blog').href = data.blog || '#';
            document.getElementById('profile-followers').innerText = data.followers;
            document.getElementById('github-link').href = data.html_url;
        })
        .catch(error => {
            console.error('Erro ao carregar perfil do GitHub:', error);
        });

    // Carregar repositórios do usuário do GitHub
    fetch('https://api.github.com/users/GabrielHCarvalhaes/repos')
        .then(response => response.json())
        .then(repos => {
            const reposContainer = document.getElementById('repositorios');
            repos.forEach(repo => {
                const repoElement = document.createElement('a');
                repoElement.href = repo.html_url;
                repoElement.target = '_blank';
                repoElement.className = 'repositorio';

                repoElement.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || ''}</p>
                    <div class="estatisticas-repo">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                    </div>
                `;

                reposContainer.appendChild(repoElement);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar repositórios do GitHub:', error);
        });

    // Carregar conteúdos sugeridos do JSON Server
    fetch('http://localhost:3000/conteudosSugeridos')
        .then(response => response.json())
        .then(conteudos => {
            const carouselIndicators = document.getElementById('carousel-indicators');
            const carouselInner = document.getElementById('carousel-inner');

            conteudos.forEach((conteudo, index) => {
                const indicator = document.createElement('button');
                indicator.type = 'button';
                indicator.dataset.bsTarget = '#carouselExampleCaptions';
                indicator.dataset.bsSlideTo = index;
                if (index === 0) indicator.classList.add('active');
                indicator.ariaCurrent = index === 0 ? 'true' : 'false';
                indicator.ariaLabel = `Slide ${index + 1}`;
                carouselIndicators.appendChild(indicator);

                const item = document.createElement('div');
                item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                item.innerHTML = `
                    <img src="${conteudo.imagem}" class="d-block w-100" alt="${conteudo.titulo}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${conteudo.titulo}</h5>
                        <p>${conteudo.descricao}</p>
                        <a href="${conteudo.url}" class="btn btn-primary" target="_blank">Ver Mais</a>
                    </div>
                `;
                carouselInner.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar conteúdos sugeridos:', error);
        });

    // Carregar colegas de trabalho do JSON Server
    fetch('http://localhost:3000/colegasDeTrabalho')
        .then(response => response.json())
        .then(colegas => {
            const colegasContainer = document.getElementById('colegas');

            colegas.forEach(colega => {
                const colegaElement = document.createElement('div');
                colegaElement.className = 'pessoa';

                colegaElement.innerHTML = `
                    <img src="${colega.imagem}" alt="${colega.nome}">
                    <h3>${colega.nome}</h3>
                    <a href="${colega.url}" target="_blank">Perfil no GitHub</a>
                `;

                colegasContainer.appendChild(colegaElement);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar colegas de trabalho:', error);
        });
});
