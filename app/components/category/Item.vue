<!-- components/CategoryMenuItem.vue -->
<template>
  <!-- Jika punya children, render sub-menu -->
  <el-sub-menu v-if="hasChildren" :index="computedIndex">
    <template #title>{{ item.name }}</template>

    <!-- Render children recursively -->
    <template v-for="(child, childIdx) in item.children" :key="child.id">
      <CategoryMenuItem
        :item="child"
        :parent-index="`${computedIndex}-${childIdx}`"
        :level="level + 1"
      />
    </template>
  </el-sub-menu>

  <!-- Jika tidak punya children, render menu item biasa -->
  <el-menu-item v-else :index="computedIndex">
    {{ item.name }}
  </el-menu-item>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";
import type { CategoryChild, ProductCategory } from "~/types/category";

// Props
const props = defineProps({
  item: {
    type: Object as PropType<CategoryChild | ProductCategory>,
    required: true,
  },
  parentIndex: {
    type: String,
    default: "",
  },
  level: {
    type: Number,
    default: 0,
  },
});

// Computed index
const computedIndex = computed(() => {
  if (props.parentIndex) {
    return props.parentIndex;
  }
  // Untuk top level, gunakan ID
  return `cat-${props.item.id}`;
});

// Check if has children
const hasChildren = computed(() => {
  return props.item.children && props.item.children.length > 0;
});

defineOptions({
  name: "CategoryItem",
});
</script>
