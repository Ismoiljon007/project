import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
  const savePosts = ref([]);
  const saveAlbum = ref([]);
  const limitPost = ref(10);
  const posts = ref(null);
  const users = ref(null);
  const postId = ref(null);
  const post = ref(null);
  async function getNewPosts() {
    limitPost.value += 10;
    localStorage.setItem("limitPost", limitPost.value);
    const data = await $fetch(
      "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=" +
        localStorage.getItem("limitPost")
    );
    posts.value = data;
  }
  const albumId = ref(null);
  const succesModal = ref(false);
  const succesContent = ref("");
  const postTitle = ref();
  const postName = ref();
  const postDesc = ref();
  const requestModal = ref(false);
  const requestModalAny = ref(false);
  const allPost = ref([]);
  const allAlbums = ref([]);
  const allAlbumsSave = ref([]);
  const removeAllPost = () => {
    allPost.value.forEach((el) => {
      el.remove();
      allPost.value = [];
    });
    localStorage.setItem(
      "limitPost",
      document.querySelectorAll(".post-item").length
    );
  };
  const removeAllAlbums = () => {
    allAlbums.value.forEach((el) => {
      el.remove();
      allAlbums.value = [];
    });
    localStorage.setItem(
      "limitAlbums",
      document.querySelectorAll(".album-item").length
    );
  };
  async function getPosts() {
    if (localStorage.getItem("limitPost")) {
      const n =
        localStorage.getItem("limitPost") > 9
          ? localStorage.getItem("limitPost")
          : 10;
      const data = await $fetch(
        "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=" + n
      );
      posts.value = data;
    } else {
      const data = await $fetch(
        "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=" + 10
      );
      posts.value = data;
    }
  }

  async function getUsers() {
    const data = await $fetch("https://jsonplaceholder.typicode.com/users");
    users.value = data;
  }
  getUsers();
  async function deleteItem() {
    const item = posts.value.find((el) => el.id === postId.value);
    if (item !== undefined) {
      posts.value = posts.value.filter((elem) => elem.id !== postId.value);
    }
  }
  async function deleteAlbum() {
    const item = albums.value.find((el) => el.id === albumId.value);
    if (item !== undefined) {
      albums.value = albums.value.filter((elem) => elem.id !== albumId.value);
    }
  }
  async function edit() {
    const arr = posts.value.map((el) => {
      if (el.id == postId.value) {
        el.title = postTitle.value;
        el.body = postDesc.value;
        post.value.classList.forEach((el) => {
          document.querySelector(`.${post.value.classList}`).textContent =
            postName.value;
        });
      }
    });
  }

  const editModal = ref(false);
  const overlay = ref(false);

  const limitAlbums = ref(10);
  const albums = ref(null);
  async function getNewAlbums() {
    limitAlbums.value += 10;
    localStorage.setItem("limitAlbums", limitAlbums.value);
    const data = await $fetch(
      "https://jsonplaceholder.typicode.com/albums?_start=0&_limit=" +
        localStorage.getItem("limitAlbums")
    );
    albums.value = data;
  }
  async function getAlbums() {
    const num = localStorage.getItem("limitAlbums")
      ? localStorage.getItem("limitAlbums")
      : limitAlbums.value;
    const data = await $fetch(
      "https://jsonplaceholder.typicode.com/albums?_start=0&_limit=" + num
    );
    albums.value = data;
  }
  getAlbums();
  const allPostSave = ref([]);
  function savePost() {
    allPostSave.value.forEach((item) => {
      if (savePosts.value.length != 0) {
        const elem = savePosts.value.find((el) => el == item);
        if (elem == undefined) {
          savePosts.value.push(item);
        }
        localStorage.setItem("savePosts", JSON.stringify(savePosts.value));
      } else {
        savePosts.value.push(item);
        localStorage.setItem("savePosts", JSON.stringify(savePosts.value));
      }
    });
  }
  function saveAlbums() {
    allAlbumsSave.value.forEach((item) => {
      if (saveAlbum.value.length != 0) {
        const elem = saveAlbum.value.find((el) => el == item);
        console.log(item);

        if (elem == undefined) {
          saveAlbum.value.push(item);
          console.log(item);
        }
        localStorage.setItem("saveAlbums", JSON.stringify(saveAlbum.value));
      } else {
        saveAlbum.value.push(item);
        localStorage.setItem("saveAlbums", JSON.stringify(saveAlbum.value));
      }
    });
  }
  return {
    allAlbumsSave,
    saveAlbums,
    allPostSave,
    savePost,
    removeAllAlbums,
    albumId,
    deleteAlbum,
    allAlbums,
    saveAlbum,
    savePosts,
    requestModalAny,
    succesModal,
    succesContent,
    requestModal,
    removeAllPost,
    allPost,
    albums,
    getNewAlbums,
    getAlbums,
    getUsers,
    post,
    postId,
    deleteItem,
    posts,
    getNewPosts,
    getPosts,
    edit,
    editModal,
    overlay,
    postTitle,
    postName,
    postDesc,
    users,
  };
});
