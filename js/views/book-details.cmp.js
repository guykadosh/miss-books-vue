import longText from '../cmps/long-text.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'
import reviewList from '../cmps/review-list.cmp.js'
import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/eventBus-service.js'

export default {
  template: `
    <section v-if="book" class="book-details-container">
      <div class="book-details main-layout flex">
        <div class=img-box>
          <img :src="book.thumbnail" alt="">
        </div>

        <div class="book-desc">
          <h2>{{ book.title }} <span class="price" :class="priceClass">{{ price }}</span></h2>
          <p class="author">By <span>{{ authors }}</span></p>
          <h4>{{ book.subtitle }}</h4>
          <p>Published at: {{ book.publishedDate }} {{ bookAge }}</p>

          <long-text :text="book.description"></long-text>

          <div class="more-details">
            <div>
              <span class="detial">{{ readingType }}</span>
              <span class="detial">{{ book.language }}</span>
            </div>
            <ul class="tags flex clean-list">
              <li v-for="category in book.categories ">
                <span class="tag">{{category}}</span>
              </li>
            </ul>
          </div>

          <div v-if="book.listPrice.isOnSale" class="ribbon   ribbon-top-right"><span>sale</span></div>
     
        
        <button class="btn" @click="goBack">Go Back</button>
        </div>
      </div>
      
      <!-- <pre>{{ book.reviews }}</pre> -->
      <review-list :reviews="book.reviews" @removed="removeReview" />
      <review-add @posted="addReview" />
    </section>
    `,
  components: {
    longText,
    reviewAdd,
    reviewList,
  },
  data() {
    return {
      book: null,
      isLongText: false,
      langCodes: {
        USD: 'en-US',
        ILS: 'he-il',
        EUR: 'en-gb',
      },
    }
  },
  created() {
    const id = this.$route.params.bookId
    bookService.get(id).then(book => (this.book = book))
  },
  methods: {
    addReview(review) {
      bookService
        .addReview(this.book.id, review)
        .then(book => {
          this.book = book
          eventBus.emit('show-msg', {
            txt: 'Review was successfully posted!',
            type: 'success',
          })
        })
        .catch(error =>
          eventBus.emit('show-msg', {
            txt: 'Somthing went wrong, Try again!',
            type: 'error',
          })
        )
    },
    removeReview(reviewId) {
      bookService.removeReview(this.book.id, reviewId).then(book => {
        this.book = book
        eventBus.emit('show-msg', {
          txt: 'Review was successfully removed!',
          type: 'success',
        })
      })
    },
    goBack() {
      this.$router.push('/book')
    },
  },
  computed: {
    readingType() {
      if (this.book.pageCount > 500) return 'Long reading'
      if (this.book.pageCount > 200) return 'Decent reading'
      return 'Light reading'
    },
    bookAge() {
      const currYear = new Date().getFullYear()
      const publishedYear = this.book.publishedDate
      if (currYear > publishedYear + 10) return 'Veteran Book'
      if (currYear === publishedYear + 1) return 'New!'
      return ''
    },
    priceClass() {
      const price = this.book.listPrice.amount
      return { 'high-price': price > 150, 'low-price': price < 20 }
    },
    descShort() {
      const words = this.book.description.split(' ')
      console.log(words)
      if (words.length > 100) return words.slice(0, 99).join(' ')

      return this.book.description
    },
    isLongDesc() {
      const words = this.book.description.split(' ')
      return words.length > 100
    },
    authors() {
      return this.book.authors.join(', ')
    },
    toggleLongText() {
      return this.isLongText ? 'Less...' : 'More...'
    },
    price() {
      const currencyCode = this.book.listPrice.currencyCode
      return this.book.listPrice.amount.toLocaleString(
        this.langCodes[currencyCode],
        {
          style: 'currency',
          currency: currencyCode,
        }
      )
    },
  },
}
