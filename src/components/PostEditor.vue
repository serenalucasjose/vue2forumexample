
<template>
  <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          v-model="text"
          class="form-input"
          name="content"
          rows="8"
          cols="140">
        </textarea>
      </div>
      <div class="btn-group">
        <button class="btn btn-blue" type="submit" name="Publish">Submit Post</button>
      </div>
    </form>
</template>

<script>
export default {
  name: 'PostEditor',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    save () {
      const post = {
        text: this.text
      }
      this.$emit('save', { post })
      this.text = ''
    }
  }
}
</script>

<style>
</style>
