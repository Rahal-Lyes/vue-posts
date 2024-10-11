<template>
  <div class="container">
    <h1 class="title">Latest Posts</h1>
    <div class="create-port">
      <form class="form" @submit.prevent="createPost">
        <label for="create-port"> Say Something .....</label>
        <input type="text" id="create-post" v-model="text"  placeholder="Create a Post"/>
        <button type="submit">Post</button>
      </form>
    </div>
    <hr>

    <!-- Affichage des erreurs s'il y en a -->
    <p class="error" v-if="error">{{ error }}</p>

    <!-- Conteneur pour afficher tous les posts -->
    <div class="post-container">
      <!-- Boucle sur chaque post pour l'afficher -->
      <div class="post" v-for="post in posts" :key="post._id" v-on:dblclick="deletePost(post._id)">
        <!-- Formatage de la date -->
        <strong>{{formatDateTime(post.createAt)}}</strong>



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
      text:''
    };
  },
  methods: {
  
    async createPost(){
      await PostService.insertPost(this.text)
      this.post=await PostService.getPosts();
    },
    async deletePost(id){
      await PostService.deletePost(id)
      this.post=await PostService.getPosts();
    },
  formatDateTime(dateString) {
    const date = new Date(dateString);
    
    // Récupérer les composants de la date et de l'heure
    const day = date.getDate();
    const month = date.getMonth() + 1; // Mois commence à 0
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Retourner la date formatée
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  },

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
.post-container :hover{

cursor: pointer;
background-color: yellow;

}

.post {
  border: 1px solid #e8a257;
  padding: 15px;
  margin: 10px;
  width: 30%;
  border-radius: 5px;
  
}

.title{
  color:rgb(5, 5, 90);
  font-size: 1.9rem;
  text-align: center;
  
}
.create-port form{

  padding: 10px;

  label{
    color:rgb(10, 21, 69);
    font-size: 1.3rem;
    padding:1rem;
    display: block;
    
  }
  input{
    background-color: beige;
    padding: 0.7rem;
  }
  button{
    padding: 0.7rem;
    background: yellow;

  }
}
</style>
