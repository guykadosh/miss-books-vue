export default {
  template: `
  <section class="home-page">
    <div class="headings">
      <h1>Welcome to MissBooks Backoffice</h1>
      <h2>Manage your book store daily and easily!</h2>
      <button @click="goToBooks" class="btn">Start manage your books</button>
    </div>
    <img src="img/home-page.svg" alt="">
 </section>
`,
  methods: {
    goToBooks() {
      this.$router.push('/book')
    },
  },
}
