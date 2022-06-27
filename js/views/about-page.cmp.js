// import gsap from 'gsap'

export default {
  template: `
  <section class="about-page main-layout">
    <h2>About</h2>
    <div
    @mousemove="onMousemove"
    :style="{ backgroundColor: 'hsl(' + x + ', 80%, 50%)' }"
     class="movearea">
     <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis magnam laboriosam tempora ab consequatur! Neque error totam autem nemo quos, pariatur quasi, sunt corrupti odio aliquid officia dolorum veniam voluptatem sequi asperiores cum quod! Itaque quo veniam eum, alias facilis obcaecati in pariatur! Magni illum error voluptas laudantium dolorum iste.</p>
     <p>x: {{ x }}</p>
    </div>

    <div :class="{ shake: disabled }">
      <button @click="warnDisabled">Click me</button>
      <span v-if="disabled">This feature is disabled!</span>
    </div>

    <div>
      Type a number: <input v-model.number="number" />
      <p>{{ tweened.toFixed(0) }}</p>    
    </div>
 </section>
`,
  data() {
    return {
      interval: null,
      disabled: false,
      x: 0,
      number: 0,
      tweened: 0,
    }
  },
  watch: {
    number(n) {
      gsap.to(this, { duration: 0.5, tweened: Number(n) || 0 })
    },
  },
  created() {
    this.interval = setInterval(() => {
      console.log('Strange bonus')
    }, 5000)
  },
  methods: {
    warnDisabled() {
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 1500)
    },
    onMousemove(e) {
      this.x = e.clientX
    },
  },
  unmounted() {
    clearInterval(this.interval)
  },
}
