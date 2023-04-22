
export class Favorites {
  constructor(root) {
    this.root = document.querySelector("#app")
    this.load()
  }

  load() {
    this.entries = [
      {
        login: "Felipe-Monte",
        name: "Felipe-Monte-span",
        public_repos: "99",
        followers: "5000"
      },
      {
        login: "Jonas",
        name: "Jonas-span",
        public_repos: "40",
        followers: "2500"
      }
    ]
  }
}

export class FavoritesViewer extends Favorites {
  constructor(root) {
    super(root)
    this.tbody = this.root.querySelector('table tbody')
    this.update()
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