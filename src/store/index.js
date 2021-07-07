import { createStore } from 'vuex'
import sourceData from '@/data.json'
import { findById, upsert } from '@/helpers'

export default createStore({
  state: {
    ...sourceData,
    authId: 'NnooaWj4KHVxbhKwO1pEdfaQDsD2'
  },
  getters: {
    user: state => {
      return (id) => {
        const user = findById(state.users, id)
        if (!user) return null
        return {
          ...user,
          get posts () {
            return state.posts.filter(post => post.userId === user.id)
          },
          get postsCount () {
            return this.posts.length
          },
          get threads () {
            return state.threads.filter(thread => thread.userId === user.id)
          },
          get threadsCount () {
            return this.threads.length
          }
        }
      }
    },
    authUser: (state, getters) => {
      return getters.user(state.authId)
    },
    thread: state => {
      return (id) => {
        const thread = findById(state.threads, id)
        return {
          ...thread,
          get author () {
            return findById(state.users, thread.userId)
          },
          get repliesCount () {
            return thread.posts.length - 1
          },
          get contributorsCount () {
            return thread.contributors.length
          }
        }
      }
    }
  },
  mutations: {
    setUser (st, { user, userId }) {
      const userIndex = st.users.findIndex(user => user.id === userId)
      st.users[userIndex] = user
    },
    setPost (st, { post }) {
      upsert(st.posts, post)
    },
    setThread (st, { thread }) {
      upsert(st.threads, thread)
    },
    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),
    appendContributorToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' })
  },
  actions: {
    createPost ({ commit, state }, post) {
      post.id = 'qqq' + Math.random()
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)
      commit('setPost', { post })
      commit('appendPostToThread', { childId: post.id, parentId: post.threadId })
      commit('appendContributorToThread', { childId: state.authId, parentId: post.threadId })
    },
    updateUser ({ commit }, user) {
      commit('setUser', { user, userId: user.id })
    },
    async createThread ({ commit, state, dispatch }, { text, title, forumId }) {
      const id = 'qqq' + Math.random()
      const userId = state.authId
      const publishedAt = Math.floor(Date.now() / 1000)
      const thread = { forumId, title, publishedAt, userId, id }
      commit('setThread', { thread })
      commit('appendThreadToUser', { parentId: userId, childId: id })
      commit('appendThreadToForum', { parentId: forumId, childId: id })
      dispatch('createPost', { text, threadId: id })
      return findById(state.threads, id)
    },
    async updateThread ({ commit, state }, { title, text, id }) {
      const thread = state.threads.find(t => t.id === id)
      const post = state.posts.find(p => p.id === thread.posts[0])
      const newThread = { ...thread, title }
      const newPost = { ...post, text }
      commit('setPost', { post: newPost })
      commit('setThread', { thread: newThread })
      return newThread
    }
  }
})

/* Mutation Maker (HOF) */
function makeAppendChildToParentMutation ({ parent, child }) {
  return (st, { childId, parentId }) => {
    const resource = findById(st[parent], parentId)
    resource[child] = resource[child] || []
    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}
