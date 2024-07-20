<template>
  <div class="bg-gray-900 text-white min-h-screen flex flex-col">
    <!-- Menu -->
    <nav class="bg-gray-800 p-4 relative z-10">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <img src="./assets/binoculars.svg" alt="Binokle Logo" class="h-10 w-10 mr-2">
          <span class="text-2xl font-bold">Binokle</span>
        </div>
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-4 justify-end">
          <a href="#" class="text-white hover:text-gray-300">Privacy</a>
          <a href="#" class="text-white hover:text-gray-300">About Us</a>
          <a href="#" class="text-white hover:text-gray-300">Contact</a>
        </div>
        <!-- Menu toggle button -->
        <button @click="toggleMenu" class="md:hidden text-white focus:outline-none">
          <svg v-if="!isMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
          <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </nav>
    <!-- Mobile Menu Overlay -->
    <div v-if="isMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 flex items-center justify-center">
      <div class="text-center relative w-full max-w-sm">
        <button @click="toggleMenu" class="absolute top-0 right-0 m-4 text-white hover:text-gray-300 focus:outline-none">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <a href="#" class="block text-white hover:text-gray-300 py-4 text-xl">Privacy</a>
        <a href="#" class="block text-white hover:text-gray-300 py-4 text-xl">About Us</a>
        <a href="#" class="block text-white hover:text-gray-300 py-4 text-xl">Contact</a>
      </div>
    </div>
    <!-- Main Content -->
    <main class="flex-grow flex flex-col items-center justify-start pt-20 px-4">
      <!-- Search Input with Go Button -->
      <div class="relative w-full max-w-lg mb-8">
        <div class="flex items-center relative">
          <input 
            id="query" 
            v-model="searchQuery" 
            type="text" 
            class="w-full p-4 pr-20 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white" 
            placeholder="Ask a question..."
            @keyup.enter="search"
          >
          <button 
            @click="search" 
            :disabled="!searchQuery.trim() || isLoading" 
            class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">Go</span>
            <span v-else>Loading...</span>
          </button>
        </div>
      </div>
      <!-- Title with Flowing Colors -->
      <div class="relative mb-8">
        <div class="loading-text">Binokle</div>
      </div>
      <!-- Search Results (conditionally rendered) -->
      <div v-if="searchResponse" id="response" class="mt-4 p-4 bg-gray-800 border border-gray-700 rounded shadow w-full max-w-lg">
        <!-- Display AI Response Here -->
        <div class="text-white text-center">
          <p>{{ searchResponse }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      searchQuery: '',
      searchResponse: null,
      isMenuOpen: false,
      isLoading: false,
    };
  },
  methods: {
    async search() {
      if (this.searchQuery.trim()) {
        this.isLoading = true;
        try {
          const response = await axios.post('https://binokle-server.vercel.app/', {
            message: this.searchQuery
          });
          this.searchResponse = response.data.response;
        } catch (error) {
          console.error('Error:', error);
          if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
            this.searchResponse = `Server error: ${error.response.status}`;
          } else if (error.request) {
            console.error(error.request);
            this.searchResponse = 'No response received from server';
          } else {
            console.error('Error', error.message);
            this.searchResponse = error.message;
          }
        } finally {
          this.isLoading = false;
        }
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<style>
/* Remove default margin and padding */
html, body {
  margin: 0;
  padding: 0;
}

/* TailwindCSS styles */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Menu toggle animation */
button:focus svg {
  animation: rotate 0.5s linear;
}

@keyframes rotate {
  100% {
    transform: rotate(180deg);
  }
}

/* Gradient animation for title */
.loading-text {
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ff0000);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient 3s linear infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Typing effect for placeholder */
@keyframes typing {
  0% { width: 0 }
  100% { width: 100% }
}

input::placeholder {
  overflow: hidden;
  display: inline-block;
  animation: typing 3s steps(20, end) infinite;
  white-space: nowrap;
}
</style>
