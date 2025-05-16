<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NLayout, NLayoutSider, NMenu, type MenuOption } from 'naive-ui';
import { Graphical } from './graphical';
import { TestStage } from './stages/testStage';

const menuOptions: MenuOption[] = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat',
      },
    ],
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    disabled: true,
  },
];

const graph = new Graphical();

onMounted(() => {
  const dom = document.querySelector('#content');
  if (!dom) return;
  graph.initialize({ dom });
  graph.playStage(TestStage, { setMsg });
});

const msg = ref('');

const setMsg = (message: string) => {
  msg.value = message;
};

const jumpBox = (color: string) => {
  (graph.curStage as any)?.jumpBox(color);
};
</script>

<template>
  <div>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
      >
        <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout>
        <div id="content"></div>
      </n-layout>
    </n-layout>
  </div>
</template>

<style scoped>
#content {
  width: 100%;
  height: 100vh;
}
.operate {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #fff;
  padding: 20px;
}
</style>
