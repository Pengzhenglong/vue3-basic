<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <button @click="increase">+1</button>
  <h1>{{ greetings }}</h1>
  <button @click="updateGreeting">Update Title</button>
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
</template>

<script lang="ts">
import { ref, computed, reactive, toRefs, watch } from "vue";
// import HelloWorld from './components/HelloWorld.vue';
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}
export default {
  name: "App",
  setup() {
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
    const greetings = ref("");
    const updateGreeting = () => {
      greetings.value += "Hello!";
    };
    watch([greetings, () => data.count], (newVaule, oldValue) => {
      console.log("new    " + newVaule);
      console.log("old    " + oldValue);
      document.title = "updated" + greetings.value + data.count;
    });

    const refData = toRefs(data);
    return {
      ...refData,
      greetings,
      updateGreeting,
    };
  },
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
