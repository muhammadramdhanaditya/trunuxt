<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";

const route = useRoute();
const router = useRouter();

// Refs
const searchQuery = ref(route.query.nama || "");
const searchPlaceholder = ref("Cari produk...");
const { t } = useI18n();
const $screen = useScreen();

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: "/search",
      query: {
        nama: searchQuery.value,
        // Tambahkan query lainnya jika diperlukan
      },
    });
  }
};
</script>

<template>
  <nav
    class="flex flex-col fixed backdrop-filter backdrop-blur-md top-0 z-40 w-full flex-none transition-colors duration-300 lg:z-50 border-b border-gray-950/10 dark:border-gray-50/[0.2] bg-white/[0.5] dark:bg-gray-950/[0.5] lg:px-2 py-2 md:px-1 h-[100px] max-h-[100px] px-5"
  >
    <div class="flex px-10">
      <Trulink
        to="http://trumecs.test"
        class="font-bold text-xl flex gap-2 items-center"
      >
        <img
          v-if="$colorMode.value === 'dark'"
          src="http://trumecs.test/nuxt-app/logo/light.png"
          alt="logo trumecs"
          class="w-[200px]"
        />
        <img
          v-if="$colorMode.value === 'light'"
          src="http://trumecs.test/nuxt-app/logo/light.png"
          alt="logo trumecs"
          class="w-[200px]"
        />
      </Trulink>
      <div class="flex-grow mx-4">
        <div class="flex items-center justify-center gap-3 w-full">
          <div class="flex-grow" style="max-width: 600px">
            <form @submit.prevent="handleSearch" class="flex">
              <el-input
                v-model="searchQuery"
                class="flex-grow"
                :placeholder="searchPlaceholder"
                @keyup.enter="handleSearch"
              >
                <template #append>
                  <el-button
                    type="primary"
                    native-type="submit"
                    class="!rounded-e-md !-me-1"
                  >
                    <Icon name="material-symbols:search" class="text-lg" />
                  </el-button>
                </template>
              </el-input>
            </form>
          </div>

          <div class="flex-shrink-0">
            <p class="mb-0 text-gray-500 text-sm">
              <small><strong>atau</strong></small>
            </p>
          </div>

          <div class="flex-shrink-0 min-w-[160px]">
            <NuxtLink
              to="/bulk"
              class="el-button el-button--primary w-full py-2 flex items-center justify-center"
            >
              Infokan Kebutuhanmu
            </NuxtLink>
          </div>
        </div>
      </div>
      <SwitcherTheme />
      <SwitcherLang />
    </div>
    <div></div>
  </nav>
</template>
