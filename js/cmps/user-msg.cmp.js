import { eventBus } from '../services/eventBus-service.js'

export default {
  template: `
 <section v-if="msg" class="user-msg flex" :class="msg.type">
    <i v-if="msg.type === 'success'" class="fa-solid fa-circle-check"></i>
    <i v-else class="fa-solid fa-circle-exclamation"></i>
    <h3>{{msg.txt}}</h3>
 </section>
`,
  data() {
    return {
      unsubscribe: null,
      msg: null,
    }
  },
  created() {
    this.unsubscribe = eventBus.on('show-msg', this.showMsg)
  },
  methods: {
    showMsg(msg) {
      this.msg = msg
      setTimeout(() => {
        this.msg = null
      }, 2000)
    },
  },
  unmounted() {
    this.unsubscribe()
  },
}
