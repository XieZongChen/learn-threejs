<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { init } from './init';

const msg = ref('');
const jumpRef = ref<((color: string) => void) | null>(null);

const setMsg = (message: string) => {
  msg.value = message;
};

const jumpBox = (color: string) => {
  if (jumpRef.value) {
    jumpRef.value(color);
  }
};

onMounted(() => {
  const dom = document.querySelector('#content');
  if (!dom) return;
  const { jump } = init(dom, setMsg);
  jumpRef.value = jump;
});
</script>

<template>
  <div>
    <div id="header">vue & three.js</div>
    <div id="main">
      <div id="content"></div>
      <div id="operate">
        <button @click="jumpBox('red')">red</button>
        <button @click="jumpBox('green')">green</button>
        <button @click="jumpBox('blue')">blue</button>
        <p>{{ msg }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
