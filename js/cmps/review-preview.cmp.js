export default {
  props: ['review'],
  template: `
    <article>
      <span v-for="i in review.rate">
        <span class="fa fa-star checked"></span>
      </span>
      <p>{{ review.reviewer }}</p>
      <p>{{ review.date }}</p>
      <p>{{ review.text }}</p>
    </article>
`,
}
