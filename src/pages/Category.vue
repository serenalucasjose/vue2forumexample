<template>
  <h1>{{ category.name }}</h1>
  <forum-list
    :forums="getForumsForCategory(category.id)"
    :category-name="category.name"
  />
</template>

<script>
import ForumList from '@/components/ForumList'

export default {
  name: 'Category',
  components: {
    ForumList
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    category () {
      return this.$store.state.categories.find(category => category.id === this.id)
    }
  },
  methods: {
    getForumsForCategory (categoryId) {
      return this.$store.state.forums.filter(forum => forum.categoryId === categoryId)
    }
  }
}
</script>

<style>
</style>
