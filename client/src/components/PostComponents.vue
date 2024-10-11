<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <hr>

    <!-- Affichage des erreurs s'il y en a -->
    <p class="error" v-if="error">{{ error }}</p>

    <!-- Conteneur pour afficher tous les posts -->
    <div class="post-container">
      <!-- Boucle sur chaque post pour l'afficher -->
      <div class="post" v-for="post in posts" :key="post._id">
        <!-- Formatage de la date -->
        <strong>{{ post.createdAt.getDate() }}</strong>
        <p>{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '@/PostService';

export default {
  name: 'PostComponents',
  data() {
    return {
      posts: [],
      error: '', // Variable pour stocker les messages d'erreur
    };
  },
  async created() {
    try {
      // Récupération des posts via PostService
      this.posts = await PostService.getPosts();
    } catch (error) {
      // Affichage de l'erreur si la requête échoue
      this.error = error.message;
    }
  },
  methods: {
    // Méthode pour formater la date
    formatDate(date) {
      const d = new Date(date);
      const day = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
};
</script>

<style scoped>
/* Style personnalisé pour le composant */
.container {
  width: 80%;
  margin: auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}

.post-container {
  display: flex;
  flex-wrap: wrap;
}

.post {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px;
  width: 30%;
  border-radius: 5px;
}
</style>
