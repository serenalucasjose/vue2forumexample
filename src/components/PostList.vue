<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.postId" class="post">
      <div class="user-info">
        <a href="#" class="user-name">{{
          userById(post.userId).name
        }}</a>

        <a href="#">
          <img
            class="avatar-large"
            :src="userById(post.userId).avatar"
            alt=""
          />
        </a>

        <p class="desktop-only text-small">{{ userById(post.userId).postsCount }} posts</p>

        <p class="desktop-only text-small">{{ userById(post.userId).threadsCount }} threads</p>

        <span class="online desktop-only">online</span>
      </div>

      <div class="post-content">
        <div>
          {{ post.text }}
        </div>
      </div>

      <!-- Date -->
      <div class="post-date text-faded">
        <app-date :timestamp="post.publishedAt" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PostList',
  props: {
    posts: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    threads () {
      return this.$store.state.threads
    },
    users () {
      return this.$store.state.users
    }
  },
  methods: {
    userById (userId) {
      return this.$store.getters.user(userId)
    }
  }
}
</script>

<style>
</style>
