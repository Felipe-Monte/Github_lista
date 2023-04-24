
export class GithubUsers {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint)
      .then(data => data.json())
      .then(data => ({
        login: data.login,
        name: data.name,
        public_repos: data.public_repos,
        followers: data.followers
      }))
  }
}

// como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector("#app")
    this.load()

    GithubUsers.search("Felipe-Monte").then(user => console.log(user))
  }

  // salvando no localStorage
  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  // função para deletar usuario clicado
  delete(user) {
    // filtrando e atribuindo a entries
    const filteredEntries = this.entries.filter(entry =>
      entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
  }
}

// clase que vai criar a vizualização de eventos do HTML
export class FavoritesViewer extends Favorites {
  constructor(root) {
    super(root)
    this.tbody = this.root.querySelector('table tbody')
    this.update()
    this.onadd()
  }

  onadd() {
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const input = this.root.querySelector('#input-search')
      const inputValue = input.value
      console.log(inputValue)
    }
  }

  update() {
    this.removeAllTr()
    this.creatTr()
    this.userData()
  }

  userData() {
    this.entries.forEach(user => {
      const row = this.creatTr()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user p').innerHTML = `${user.login}`
      row.querySelector('.user span').innerHTML = `${user.name}`
      row.querySelector('.repositories').innerHTML = `${user.public_repos}`
      row.querySelector('.followers').innerHTML = `${user.followers}`

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm("Tem certeza que deseja apagar ?")

        if (isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })
  }

  creatTr() {
    const tr = document.createElement('tr')
    tr.innerHTML = `
    <td class="user">
      <img src="https://github.com/Felipe-Monte.png" alt="imagem de felipe">
      <a href="https://github.com/Felipe-Monte">
        <p>Carlos Felipe</p>
        <span>carlosfelipe</span>
      </a>
    </td>
    <td class="repositories">
      500
    </td>
    <td class="followers">
      6524
    </td>
    <td class="remove"><button>&times;</button></td>
    `
    return tr
  }

  removeAllTr() {
    const tr = document.querySelectorAll('tbody tr')
    tr.forEach(tr => {
      tr.remove()
    })
  }

}