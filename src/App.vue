<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <p>{{error}} </p>
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <h1>x:{{ x }}</h1>
  <h1>y: {{ y }}</h1>
  <h1 v-if="loading">Loading!...</h1>
  <div>
    <!-- <img v-if="loaded" :src="result[0].url" alt="" /> -->
  </div>
  <button @click="openModal">close MyModal !!!</button><br />
  <Modal :isOpen="modalIsOpen" @close-modal="onModalClose"> My Modal!!!!</Modal>
  <!-- <AsyncShow></AsyncShow> -->
  <Suspense>
    <template #default>
      <div>
        <async-show />
        <dog-show />
      </div>
    </template>
    <template #fallback>
      <h1>Loading !...</h1>
    </template>
  </Suspense>
  <button @click="increase">+1</button>
  <h1>{{ greetings }}</h1>

  <button @click="updateGreeting">Update Title</button>

  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
</template>

<script lang="ts">
import { ref, computed, reactive, toRefs, watch, onErrorCaptured } from "vue";
import useMousePosition from "./hook/useMousePosition";
import useURLLoader from "./hook/useURLLoader";
import Modal from "./components/Modal.vue";
import AsyncShow from "./components/AsyncShow.vue";
import DogShow from "./components/DogShow.vue";

// import HelloWorld from './components/HelloWorld.vue';
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}
// interface DogResult {
//   message: string;
//   status: string;
// }
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default {
  name: "App",
  setup() {
    const error = ref(null);
    onErrorCaptured((e: null) => {
      error.value = e;
      return true;
    });
    // const count = ref(0);
    // const double = computed(() => {
    //   return count.value * 2;
    // });
    // const increase = () => {
    //   count.value++;
    // };
    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++;
      },
      double: computed(() => data.count * 2),
    });
    const { x, y } = useMousePosition();
    const greetings = ref("");
    const updateGreeting = () => {
      greetings.value += "Hello!";
    };
    watch([greetings, data], (newVaule, oldValue) => {
      console.log("new    " + newVaule);
      console.log("old    " + oldValue);
      document.title = "updated" + greetings.value + data.count;
    });
    const { loaded, loading, result } = useURLLoader<CatResult[]>(
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );
    watch(result, () => {
      if (result.value) {
        console.log("value  " + result.value[0].url);
      }
    });
    const refData = toRefs(data);

    const modalIsOpen = ref(false);
    const openModal = () => {
      modalIsOpen.value = true;
    };
    const onModalClose = () => {
      modalIsOpen.value = false;
    };
    return {
      ...refData,
      greetings,
      updateGreeting,
      x,
      y,
      loaded,
      loading,
      result,
      modalIsOpen,
      openModal,
      onModalClose,
      error,
    };
  },
  components: { Modal, AsyncShow, DogShow },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
