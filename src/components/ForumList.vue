<template>
  <div class="col-full">
    <div class="forum-list">
      <h2 class="list-title">
        <router-link v-if="categoryId" :to="{ name: 'Category', params: {id: categoryId} }">{{ categoryName }}</router-link>
        <span v-else>{{ categoryName }}</span>
      </h2>
      <div v-for="forum in forums" :key="forum.id" class="forum-listing">
        <div class="forum-details">
          <router-link class="text-xlarge" :to="{ name: 'Forum', params: {id: forum.id} }"> -->
            {{ forum.name }}
          </router-link>
          <p>{{ forum.description }}</p>
        </div>

        <div class="threads-count">
          <p>
            <span class="count">{{ forum.threads?.length }}</span>
            {{ forumThreadsWord(forum) }}
            </p>
        </div>

        <div class="last-thread">
          <img
            class="avatar"
            src="https://pbs.twimg.com/profile_images/719242842598699008/Nu43rQz1_400x400.jpg"
            alt=""
          />
          <div class="last-thread-details"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForumList',
  props: {
    forums: {
      type: Array,
      required: true
    },
    categoryName: {
      type: String,
      required: true,
      default: 'Forums'
    },
    categoryId: {
      type: String,
      required: false
    }
  },
  methods: {
    forumThreadsWord (forum) {
      if (forum.threads?.length) {
        return forum.threads.length > 1 ? 'threads' : 'thread'
      } else {
        return 'no threads'
      }
    }
  }
}
</script>

<style>
</style>
