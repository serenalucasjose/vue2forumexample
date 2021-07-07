<template>
  <forum-list
    v-for="category in categories"
    :key="category.id"
    :forums="getForumsForCategory(category.id)"
    :category-name="category.name"
    :category-id="category.id"
  />
</template>

<script>
import ForumList from '@/components/ForumList'

export default {
  name: 'CategoryList',
  components: {
    ForumList
  },
  props: {
    categories: {
      type: Array,
      required: true
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
