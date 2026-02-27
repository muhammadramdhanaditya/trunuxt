<template>
  <div class="article-page">
    <!-- Hero Section dengan Featured Articles -->
    <div class="container">
      <!-- Desktop Featured Layout (lg:grid) -->
      <div class="hidden lg:grid lg:grid-cols-12 gap-6 my-8">
        <!-- Main Featured Article (col-span-6) -->
        <div class="lg:col-span-6">
          <CardsArticleListFeaturedmain :article="featuredArticles[0]" />
        </div>

        <!-- Small Featured Articles Grid (col-span-6) -->
        <div class="lg:col-span-6">
          <CardsArticleListFeaturedsub
            :articles="featuredArticles"
            :start-index="1"
            :end-index="5"
          />
        </div>
      </div>

      <!-- Mobile Featured Layout (lg:hidden) -->
      <div class="lg:hidden my-4">
        <div class="grid grid-cols-1 gap-3">
          <div
            v-for="(article, index) in featuredArticles.slice(0, 5)"
            :key="index"
            class="featured-article"
          >
            <Trulink
              :to="`/article/${article.url}`"
              class="block bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <div class="flex gap-3 p-2">
                <div class="w-1/3 aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    :src="article.image"
                    :alt="article.title"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="w-2/3 flex flex-col justify-center">
                  <span class="text-xs font-semibold text-orange-500">{{
                    article.category
                  }}</span>
                  <h3 class="font-semibold text-base line-clamp-3">
                    {{ article.title }}
                  </h3>
                  <p class="text-xs text-gray-500 mt-1">
                    <Icon
                      name="material-symbols:calendar-today"
                      class="inline mr-1 text-xs"
                    />
                    {{ formatDate(article.date) }}
                  </p>
                </div>
              </div>
            </Trulink>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs Search Section -->
    <section class="tabsearch py-8 lg:py-12 bg-gray-50">
      <div class="container">
        <div class="text-center mb-6 lg:mb-8">
          <h4 class="text-xl lg:text-2xl font-bold mb-2">
            Kirim Permintaan Barang Lebih Mudah dan Cepat
          </h4>
          <p class="text-gray-600 text-sm lg:text-base">
            Dengan
            <Trulink to="/" class="text-orange-500 hover:underline"
              >Trumecs</Trulink
            >, proses pengadaan barang menjadi lebih efisien
          </p>
        </div>

        <!-- Tabs Component -->
        <div class="bg-white rounded-xl shadow-lg p-4 lg:p-6">
          <el-tabs v-model="activeTab" class="request-tabs">
            <el-tab-pane label="Produk" name="product">
              <RequestForm type="product" />
            </el-tab-pane>
            <el-tab-pane label="Jasa" name="service">
              <RequestForm type="service" />
            </el-tab-pane>
            <el-tab-pane label="Rental" name="rental">
              <RequestForm type="rental" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </section>

    <!-- Main Content Area -->
    <section class="article-content py-8 lg:py-12">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <!-- Articles List - Left Column (lg:col-span-8) -->
          <div class="lg:col-span-8">
            <!-- Trending for Mobile (lg:hidden) -->
            <div class="lg:hidden mb-6">
              <div class="bg-orange-100 rounded-lg shadow-sm p-4">
                <h5 class="font-bold mb-3 flex items-center">
                  <Icon
                    name="material-symbols:local-fire"
                    class="text-orange-500 mr-2"
                  />
                  {{ $t("label_trending") }}
                </h5>
                <div class="grid grid-cols-1 gap-3">
                  <Trulink
                    v-for="article in trendingArticles"
                    :key="article.id"
                    :to="`/article/${article.url}`"
                    class="block hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div class="flex gap-3 p-2">
                      <div
                        class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"
                      >
                        <img
                          :src="article.image"
                          :alt="article.title"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h6 class="font-semibold text-sm line-clamp-2">
                          {{ article.title }}
                        </h6>
                        <p class="text-xs text-gray-500 mt-1">
                          <Icon
                            name="material-symbols:calendar-today"
                            class="inline mr-1"
                          />
                          {{ formatDate(article.date) }}
                        </p>
                      </div>
                    </div>
                  </Trulink>
                </div>
              </div>
            </div>

            <!-- Articles List -->
            <div class="grid grid-cols-1 gap-4" id="article-list">
              <div v-if="loading" class="text-center py-8">
                <el-skeleton :rows="3" animated />
              </div>

              <!-- Empty State -->
              <div
                v-else-if="transformedArticles.length === 0"
                class="text-center py-8"
              >
                <el-empty description="Tidak ada artikel" />
              </div>

              <!-- Article List -->
              <CardsArticleListArticle
                v-else
                :articles="transformedArticles"
                @article-click="handleArticleClick"
              />
            </div>

            <!-- Pagination -->
            <div class="flex justify-center mt-8">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="totalArticles"
                :page-size="perPage"
                v-model:current-page="currentPage"
                @current-change="handlePageChange"
              />
            </div>
          </div>

          <!-- Sidebar - Right Column (lg:col-span-4) -->
          <div class="hidden lg:block lg:col-span-4">
            <div class="sticky top-[150px]">
              <!-- Trending Section -->
              <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div
                  class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4"
                >
                  <h5 class="font-bold flex items-center">
                    <Icon name="material-symbols:local-fire" class="mr-2" />
                    {{ $t("label_trending") }}
                  </h5>
                </div>
                <div class="divide-y divide-gray-100">
                  <CardsArticleRowsmall
                    :articles="trendingArticles"
                    :show-ranking="false"
                    image-size="sm"
                    max-title-lines="2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Article } from "~/types/article";

const loading = ref(true);
const error = ref<string | null>(null);

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const goBack = () => router.back();
interface TransformedArticle {
  id: string | number;
  url: string;
  title: string;
  image: string;
  category: string;
  date: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
}

// Update tipe data
const dataArticle = ref<TransformedArticle[]>([]);

// State
const activeTab = ref("product");
const currentPage = ref(1);
const perPage = ref(10);
const totalArticles = ref(50);

const transformedArticles = computed(() => {
  if (!dataArticle.value || dataArticle.value.length === 0) {
    return []; // Return empty array if no data
  }
  return dataArticle.value;
});

const handleArticleClick = (article: Article) => {
  console.log("Article clicked:", article);
  // Bisa untuk analytics
};

const fetchArticle = async () => {
  loading.value = true;
  try {
    const response = await useFetchApi<BaseResponse<Article>>(
      `artikel-read`,
      "artikel-read",
      "get",
      null
    );

    if (response.status.value === "success") {
      const apiData = response.data.value!.payload;
      const config = useRuntimeConfig();

      // Helper function to extract category from tags
      const extractCategoryFromTags = (tags: any): string => {
        if (!tags) return "General";
        if (Array.isArray(tags)) {
          return tags[0] || "General";
        }
        if (typeof tags === "string") {
          return tags.split(",")[0].trim() || "General";
        }
        return "General";
      };

      // Helper function to create excerpt from description_seo or value
      const createExcerpt = (
        description: string | null,
        content: string | null
      ): string => {
        if (description) return description;
        if (content) {
          const stripped = content.replace(/<[^>]*>/g, "");
          return stripped.length > 150
            ? stripped.substring(0, 150) + "..."
            : stripped;
        }
        return "No description available";
      };

      // Transform the data dan assign ke dataArticle.value
      dataArticle.value = apiData.map((item: Article) => {
        return {
          id: item.id,
          url: item.url || `article-${item.id}`,
          title: item.title || "Untitled",
          image: item.img
            ? `${
                config.public.baseURL || "http://192.168.1.96:5001/api/"
              }images/${item.img}`
            : "https://via.placeholder.com/300x200?text=No+Image",
          category: extractCategoryFromTags(item.tag),
          date: item.date,
          excerpt: createExcerpt(item.discription_seo, item.value),
          author: item.created_by
            ? {
                name: `Author ${item.created_by}`,
                avatar: "https://via.placeholder.com/40x40?text=User",
                role: "Contributor",
              }
            : {
                name: "Anonymous",
                avatar: "https://via.placeholder.com/40x40?text=User",
                role: "Guest",
              },
        };
      });

      console.log("Transformed data:", dataArticle.value);

      // Update total articles jika ada dari response
      if (response.data.value!.total_data) {
        console.log("data :", response.data.value);
        totalArticles.value = response.data.value!.total_data;
      }
    }
  } catch (error) {
    console.log("error fetch apinya", error);
    ElMessage.error("Gagal memuat data artikel");
    goBack();
  } finally {
    loading.value = false;
  }
};

// Dummy Data - Featured Articles
const featuredArticles = ref([
  {
    id: 1,
    url: "cara-merawat-mesin-truk",
    title: "10 Cara Merawat Mesin Truk Agar Awet dan Tahan Lama",
    excerpt:
      "Perawatan mesin truk yang tepat dapat memperpanjang umur kendaraan dan menghindari kerusakan fatal. Simak tips lengkapnya di sini.",
    category: "Perawatan",
    date: "2024-01-15",
    image: "https://picsum.photos/800/450?random=1",
    author: {
      name: "Budi Santoso",
      avatar: "https://picsum.photos/100/100?random=101",
      role: "Mekanik Senior",
    },
  },
  {
    id: 2,
    url: "tips-memilih-ban-truk",
    title: "Tips Memilih Ban Truk yang Tepat untuk Berbagai Medan",
    category: "Tips",
    date: "2024-01-14",
    image: "https://picsum.photos/400/300?random=2",
    author: {
      name: "Ahmad Wijaya",
      avatar: "https://picsum.photos/100/100?random=102",
      role: "Technical Specialist",
    },
  },
  {
    id: 3,
    url: "tren-industri-otmotif-2024",
    title: "Tren Industri Otomotif 2024: Elektrifikasi dan Teknologi",
    category: "Berita",
    date: "2024-01-13",
    image: "https://picsum.photos/400/300?random=3",
    author: {
      name: "Siti Rahma",
      avatar: "https://picsum.photos/100/100?random=103",
      role: "Analyst",
    },
  },
  {
    id: 4,
    url: "perbedaan-oil-filter",
    title: "Perbedaan Oil Filter Original dan Palsu",
    category: "Tips",
    date: "2024-01-12",
    image: "https://picsum.photos/400/300?random=4",
    author: {
      name: "Dedi Kurniawan",
      avatar: "https://picsum.photos/100/100?random=104",
      role: "Engineer",
    },
  },
  {
    id: 5,
    url: "cara-membaca-kode-ban",
    title: "Panduan Lengkap Membaca Kode dan Spesifikasi Ban",
    category: "Edukasi",
    date: "2024-01-11",
    image: "https://picsum.photos/400/300?random=5",
    author: {
      name: "Rina Wijaya",
      avatar: "https://picsum.photos/100/100?random=105",
      role: "Product Specialist",
    },
  },
]);

// Dummy Data - Regular Articles
const articles = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i + 10,
    url: `article-${i + 10}`,
    title: `Artikel Menarik Seputar Industri Otomotif #${i + 1}`,
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: ["Berita", "Tips", "Edukasi", "Review"][
      Math.floor(Math.random() * 4)
    ],
    date: `2024-01-${String(10 - i).padStart(2, "0")}`,
    image: `https://picsum.photos/400/300?random=${i + 10}`,
    author: {
      name: ["Budi", "Ani", "Candra", "Dewi"][Math.floor(Math.random() * 4)],
      avatar: `https://picsum.photos/100/100?random=${i + 100}`,
    },
  }))
);

// Dummy Data - Trending Articles
const trendingArticles = ref([
  {
    id: 101,
    url: "tren-harga-sparepart-2024",
    title: "Prediksi Harga Sparepart Truk 2024",
    date: "2024-01-15",
    image: "https://picsum.photos/100/100?random=201",
  },
  {
    id: 102,
    url: "teknologi-mesin-terbaru",
    title: "Teknologi Mesin Truk Terbaru yang Wajib Diketahui",
    date: "2024-01-14",
    image: "https://picsum.photos/100/100?random=202",
  },
  {
    id: 103,
    url: "tips-mengemudi-safety",
    title: "10 Tips Safety Driving untuk Sopir Truk",
    date: "2024-01-13",
    image: "https://picsum.photos/100/100?random=203",
  },
  {
    id: 104,
    url: "perawatan-sistem-pendingin",
    title: "Cara Merawat Sistem Pendingin Mesin Truk",
    date: "2024-01-12",
    image: "https://picsum.photos/100/100?random=204",
  },
]);

// Methods
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
  router.push({ query: { ...route.query, page } });
  // Fetch data untuk halaman tersebut
  fetchArticle();
};

// Initialize from URL query
onMounted(() => {
  fetchArticle();
  if (route.query.page) {
    currentPage.value = Number(route.query.page);
  }
});
</script>

<!-- Request Form Component -->
<script lang="ts">
// Simple Request Form Component
const RequestForm = {
  props: ["type"],
  template: `
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <el-input 
          v-model="form.nama" 
          placeholder="Nama Lengkap"
          size="large"
        />
        <el-input 
          v-model="form.email" 
          placeholder="Email"
          size="large"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <el-input 
          v-model="form.perusahaan" 
          placeholder="Nama Perusahaan"
          size="large"
        />
        <el-input 
          v-model="form.telepon" 
          placeholder="Nomor Telepon"
          size="large"
        />
      </div>
      <el-input
        v-model="form.permintaan"
        :rows="4"
        type="textarea"
        placeholder="Deskripsikan kebutuhan Anda..."
      />
      <div class="text-center">
        <el-button 
          type="primary" 
          native-type="submit"
          size="large"
          :loading="loading"
        >
          Kirim Permintaan
        </el-button>
      </div>
    </form>
  `,
  setup() {
    const form = ref({
      nama: "",
      email: "",
      perusahaan: "",
      telepon: "",
      permintaan: "",
    });
    const loading = ref(false);

    const handleSubmit = () => {
      loading.value = true;
      // Simulate API call
      setTimeout(() => {
        loading.value = false;
        ElMessage.success("Permintaan berhasil dikirim!");
        form.value = {
          nama: "",
          email: "",
          perusahaan: "",
          telepon: "",
          permintaan: "",
        };
      }, 1500);
    };

    return { form, loading, handleSubmit };
  },
};
</script>

<style scoped>
/* Container */
.container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:text-orange-500 {
  color: #fa8420;
}

/* Custom colors */
.text-orange-500 {
  color: #fa8420;
}

.bg-orange-500 {
  background-color: #fa8420;
}

.bg-orange-50 {
  background-color: #fff7ed;
}

.hover\:bg-orange-50:hover {
  background-color: #fff7ed;
}

.from-orange-500 {
  --tw-gradient-from: #fa8420;
}

.to-orange-600 {
  --tw-gradient-to: #ea6f0e;
}

/* Pagination overrides */
:deep(.el-pagination) {
  --el-pagination-button-bg-color: transparent;
  --el-pagination-hover-color: #fa8420;
}

:deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  background-color: #fa8420;
}

/* Tabs overrides */
:deep(.el-tabs__item.is-active) {
  color: #fa8420;
}

:deep(.el-tabs__active-bar) {
  background-color: #fa8420;
}

:deep(.el-tabs__item:hover) {
  color: #fa8420;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.article-card {
  animation: fadeIn 0.5s ease-out;
}

/* Featured article hover */
.featured-article .group:hover .shadow-lg {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
