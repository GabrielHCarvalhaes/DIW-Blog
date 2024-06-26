document.addEventListener("DOMContentLoaded", function() {
    // Fetch GitHub User Info
    fetch('https://api.github.com/users/GabrielHCarvalhaes')
        .then(response => response.json())
        .then(user => {
            document.querySelector('.foto-perfil').src = user.avatar_url;
            document.querySelector('.nome-usuario').textContent = user.name;
            document.querySelector('.bio-usuario').textContent = user.bio;
            document.querySelector('.localizacao').textContent = `Localização: ${user.location}`;
            document.querySelector('.site').innerHTML = `Site: <a href="${user.blog}" target="_blank">${user.blog}</a>`;
            populateSocialLinks(user);
        });

    // Fetch GitHub Repos
    fetch('https://api.github.com/users/GabrielHCarvalhaes/repos')
        .then(response => response.json())
        .then(repos => {
            let reposContainer = document.querySelector('.repositorios');
            reposContainer.innerHTML = ''; // Clear existing content
            repos.forEach(repo => {
                let repoElement = document.createElement('a');
                repoElement.classList.add('repositorio');
                repoElement.href = `repo.html?repo=${repo.name}`;
                repoElement.innerHTML = `
                    <strong>${repo.name}</strong>
                    <p>${repo.description || 'Sem descrição disponível'}</p>
                    <div class="estatisticas-repo">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                    </div>
                `;
                reposContainer.appendChild(repoElement);
            });
        });

    // Fetch JSONServer Data
    const fetchAndDisplayData = (endpoint, containerId, createItem) => {
        fetch(`http://localhost:3000/${endpoint}`)
            .then(response => response.json())
            .then(data => {
                let container = document.getElementById(containerId);
                container.innerHTML = ''; // Clear existing content
                data.forEach(item => {
                    let itemElement = createItem(item);
                    container.appendChild(itemElement);
                });
            });
    };

    // Fetch and display contents for carousel
    fetchAndDisplayData('contents', 'carouselSugestoes', content => {
        let contentElement = document.createElement('div');
        contentElement.classList.add('carousel-item');
        contentElement.innerHTML = `
            <img src="assets/img/${content.image}" class="d-block w-100" alt="${content.title}">
            <div class="carousel-caption d-none d-md-block">
                <h5>${content.title}</h5>
                <p>${content.description}</p>
                <a href="${content.link}" class="btn btn-primary">Ver mais</a>
            </div>
        `;
        return contentElement;
    });

    // Fetch and display colleagues
    fetchAndDisplayData('colleagues', 'colegas', colleague => {
        let colleagueElement = document.createElement('div');
        colleagueElement.classList.add('pessoa');
        colleagueElement.innerHTML = `
            <img src="assets/img/${colleague.image}" alt="${colleague.name}">
            <strong>${colleague.name}</strong>
            <a href="${colleague.github}" target="_blank">Perfil GitHub</a>
        `;
        return colleagueElement;
    });

    // Function to populate social links dynamically
    function populateSocialLinks(user) {
        const socialLinks = [
            { platform: 'Twitter', icon: 'twitter', link: user.twitter_username },
            { platform: 'LinkedIn', icon: 'linkedin', link: user.linkedin_username },
            { platform: 'GitHub', icon: 'github', link: user.html_url }
        ];

        let socialLinksContainer = document.querySelector('.redes');
        socialLinks.forEach(social => {
            if (social.link) {
                let linkElement = document.createElement('a');
                linkElement.href = `https://${social.platform.toLowerCase()}.com/${social.link}`;
                linkElement.innerHTML = `<i class="ph-${social.icon}-logo"></i>`;
                socialLinksContainer.appendChild(linkElement);
            }
        });
    }
});
