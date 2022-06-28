export default {
  template: `
  <header>
    <div class="header flex main-layout">
      <div class="logo">
        <img src="img/logo-white.png" />
      </div>
      <nav class="nav-bar">
        <router-link to="/">Home</router-link>
        <router-link to="/book">Books</router-link>
        <router-link to="/about">About</router-link>
        <div class="dot"></div>
      </nav>
    </div>
  </header>
`,
  data() {
    return {}
  },
}
