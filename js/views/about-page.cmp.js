export default {
  template: `
  <section class="about-page main-layout">
    <h2>About</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis magnam laboriosam tempora ab consequatur! Neque error totam autem nemo quos, pariatur quasi, sunt corrupti odio aliquid officia dolorum veniam voluptatem sequi asperiores cum quod! Itaque quo veniam eum, alias facilis obcaecati in pariatur! Magni illum error voluptas laudantium dolorum iste.</p>
 </section>
`,
  data() {
    return {
      interval: null,
    }
  },
  created() {
    this.interval = setInterval(() => {
      console.log('Strange bonus')
    }, 5000)
  },
  unmounted() {
    clearInterval(this.interval)
  },
}
