<template>
    <div class="columns is-mobile is-centered" style="padding-top: 40px">
      <div class="column is-one-mobile is-half-desktop">
          <div class="column has-text-centered"><h4 class="title">Lastes Posts</h4></div>
          <div class="column">
            <div class="field has-addons has-addons-centered">
              <div class="control">
                <input class="input" type="text" v-model="text" placeholder="say something..." :disabled="isLoading">
              </div>
              <div class="control">
                <a :class="['button is-dark', {'is-loading': isLoading}]" @click="createPost">
                  Post
                </a>
              </div>
            </div>
          </div>
          <hr>
        <div class="column  has-text-centered">
          <span v-if="error" class="tag is-light is-medium"><i class="fas fa-exclamation-triangle"></i> &nbsp; {{error}} &nbsp; <i class="fas fa-exclamation-triangle"></i></span>
        </div>
          <div class="column">
            <article v-for="(post, index) in posts" :item="post" :key="post._id" :index="index" class="message is-small">
              <div class="message-header">
                <p>Created at: {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getYear()}`}}</p>
                <button class="delete" aria-label="delete" @click="deletePost(post._id)"></button>
              </div>
              <div class="message-body">
                {{post.text}}
              </div>
            </article>
          </div>
          <div class="modal">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Confirm</p>
              </header>
              <section class="modal-card-body">
                Are you sure to delete this post?
              </section>
              <footer class="modal-card-foot">
                <button class="button is-danger">Delete</button>
                <button class="button">Cancel</button>
              </footer>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import PostService from "../services/PostService";

export default {
  name: "posts",
  data() {
    return {
      posts: [],
      error: "",
      text: "",
      isLoading: true
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (error) {
      this.error = error.message;
    }
    this.isLoading = false;
  },
  methods: {
    async createPost() {
      this.isLoading = true;
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
      this.isLoading = false;
    },
    async deletePost(id) {
      this.isLoading = true;
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
      this.isLoading = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
