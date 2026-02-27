<template>
  <div class="article-detail-page">
    <!-- Breadcrumb -->
    <Breadcrumbs :items="articleBreadcrumb" />

    <!-- Article Not Found -->
    <div v-if="!article" class="container py-12 text-center">
      <Icon
        name="material-symbols:error-outline"
        class="text-6xl text-gray-300 mb-4"
      />
      <h2 class="text-2xl font-bold text-gray-700 mb-2">
        Artikel Tidak Ditemukan
      </h2>
      <p class="text-gray-500 mb-6">
        Maaf, artikel yang Anda cari tidak tersedia.
      </p>
      <Trulink
        to="/article"
        class="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
      >
        Kembali ke Artikel
      </Trulink>
    </div>

    <!-- Main Content - Only show if article exists -->
    <template v-if="article">
      <section class="article-detail py-6 lg:py-0" id="article-detail">
        <div class="container">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <!-- Left Column - Article Content (lg:col-span-8) -->
            <div class="lg:col-span-8">
              <article class="bg-white rounded-xl shadow-sm overflow-hidden">
                <div class="p-4 lg:p-6">
                  <!-- Title -->
                  <h1
                    class="text-2xl lg:text-3xl font-bold mb-3"
                    itemprop="headline"
                  >
                    {{ article.title }}
                  </h1>

                  <!-- Meta Info -->
                  <div
                    class="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-4"
                  >
                    <div class="flex items-center">
                      <Icon
                        name="material-symbols:calendar-today"
                        class="mr-2"
                      />
                      <span>{{ formatDate(article.date) }}</span>
                    </div>
                    <div class="flex items-center">
                      <Icon name="material-symbols:person" class="mr-2" />
                      <span>{{ article.author.name }}</span>
                    </div>
                  </div>

                  <!-- Categories -->
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span
                      v-for="cat in article.categories"
                      :key="cat"
                      class="text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-full"
                    >
                      {{ cat }}
                    </span>
                  </div>

                  <!-- Featured Image -->
                  <div class="article-image mb-6">
                    <img
                      :src="article.image"
                      :alt="article.title"
                      class="w-full rounded-xl"
                      :style="{ maxHeight: '500px', objectFit: 'cover' }"
                    />
                  </div>

                  <!-- Article Content with Dynamic Insertions -->
                  <div
                    class="article-content prose prose-sm lg:prose-base max-w-none"
                  >
                    <div v-html="processedContent"></div>
                  </div>

                  <!-- Tags -->
                  <div
                    v-if="article.tags?.length"
                    class="mt-6 pt-4 border-t border-gray-200"
                  >
                    <div class="flex flex-wrap gap-2">
                      <span class="text-sm font-semibold text-gray-600"
                        >Tags:</span
                      >
                      <Trulink
                        v-for="tag in article.tags"
                        :key="tag"
                        :to="`/article/tag/${tag.toLowerCase()}`"
                        class="text-sm text-orange-500 hover:underline"
                      >
                        #{{ tag }}
                      </Trulink>
                    </div>
                  </div>

                  <!-- Share Buttons - Mobile Only -->
                  <div class="share-buttons mt-6 pt-4 border-t border-gray-200">
                    <span class="font-semibold mr-3">Bagikan :</span>
                    <div class="flex gap-2">
                      <button
                        v-for="share in shareButtons"
                        :key="share.name"
                        @click="shareArticle(share)"
                        class="w-[30px] h-[30px] rounded-full flex items-center justify-center transition-colors"
                      >
                        <Icon :name="share.icon" class="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <!-- Right Column - Sidebar (lg:col-span-4) -->
            <div class="lg:col-span-4">
              <div class="sticky top-20 flex flex-col gap-4">
                <!-- Trending Section -->
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div class="border-b border-gray-200 px-4 py-3">
                    <h5 class="font-bold flex items-center">
                      <Icon
                        name="material-symbols:local-fire"
                        class="text-orange-500 mr-2"
                      />
                      Trending
                    </h5>
                  </div>
                  <div class="p-3">
                    <div class="space-y-3">
                      <CardsArticleRowsmall
                        :articles="trendingArticles"
                        :show-ranking="false"
                        image-size="sm"
                        max-title-lines="2"
                      />
                    </div>
                  </div>
                </div>

                <!-- Maintenance Banner - Desktop Only -->
                <CardsArticleAds
                  title="SERVICE CENTER"
                  description="Professional maintenance for your equipment"
                  buttonText="Schedule Now"
                  buttonLink="/service/schedule"
                  imageUrl="https://picsum.photos/400/200?random=100"
                  imageAlt="service center"
                />

                <!-- Related Articles -->
                <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div class="border-b border-gray-200 px-4 py-3">
                    <h5 class="font-bold">Artikel Terkait</h5>
                  </div>
                  <div class="p-3">
                    <div class="space-y-3">
                      <CardsArticleRowsmall
                        :articles="relatedArticles"
                        :show-ranking="false"
                        image-size="sm"
                        max-title-lines="2"
                      />
                    </div>
                  </div>
                </div>

                <!-- Construction Banner - Desktop Only -->
                <CardsArticleAds
                  title="CONSTRUCTION"
                  description="Engineering, Construction and procurement"
                  buttonText="Consult Now!"
                  buttonLink="/construction"
                  imageUrl="https://picsum.photos/400/200?random=998"
                  imageAlt="construction"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Request Form Section -->
      <section class="request-form py-8 lg:py-12 bg-gray-50" id="request-form">
        <div class="container">
          <div class="space-y-4">
            <h3 class="text-xl lg:text-2xl font-bold">
              Tidak menemukan barang? kirim permintaan sekarang!
            </h3>
            <div class="bg-white rounded-xl shadow-sm p-4 lg:p-6">
              <RequestForm />
            </div>
          </div>
        </div>
      </section>

      <!-- Related Products Section -->
      <section class="product-related py-8 lg:py-12" id="product-related">
        <div class="container">
          <h3 class="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
            Produk Terkait
          </h3>

          <!-- Desktop Grid (lg:grid) -->
          <div class="hidden lg:grid lg:grid-cols-4 gap-4">
            <ProductCard
              v-for="product in relatedProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- Mobile Slider (lg:hidden) -->
          <div class="lg:hidden">
            <div class="flex gap-3 overflow-x-auto pb-4 snap-x hide-scrollbar">
              <div
                v-for="product in relatedProducts"
                :key="product.id"
                class="flex-shrink-0 w-[160px] snap-start"
              >
                <ProductCardMobile :product="product" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const articleId = computed(() => route.params.slug);

const articleBreadcrumb = [
  { text: "Home", to: "/" },
  { text: "Artikel", to: "/article" },
  { text: "judul artikel" }, // tanpa 'to' berarti item terakhir (active)
];

// Reactive article state - only set if ID is 1
const article = ref(articleId.value === "1" ? articleData : null);

// Dummy Data - Trending Articles
const trendingArticles = ref([
  {
    id: 101,
    url: "tren-harga-sparepart-2024",
    title: "Prediksi Harga Sparepart Truk 2024",
    date: "2024-01-15",
    image: "https://picsum.photos/100/100?random=201",
    views: 2345,
  },
  {
    id: 102,
    url: "teknologi-mesin-terbaru",
    title: "Teknologi Mesin Truk Terbaru yang Wajib Diketahui",
    date: "2024-01-14",
    image: "https://picsum.photos/100/100?random=202",
    views: 1890,
  },
  {
    id: 103,
    url: "tips-mengemudi-safety",
    title: "10 Tips Safety Driving untuk Sopir Truk",
    date: "2024-01-13",
    image: "https://picsum.photos/100/100?random=203",
    views: 1567,
  },
  {
    id: 104,
    url: "cara-memilih-ban-truk",
    title: "Tips Memilih Ban Truk untuk Berbagai Medan",
    date: "2024-01-12",
    image: "https://picsum.photos/100/100?random=204",
    views: 1432,
  },
]);

// Dummy Data - Related Articles
const relatedArticles = ref([
  {
    id: 201,
    url: "cara-memilih-ban-truk",
    title: "Tips Memilih Ban Truk untuk Berbagai Medan",
    date: "2024-01-10",
    image: "https://picsum.photos/100/100?random=301",
  },
  {
    id: 202,
    url: "perawatan-sistem-pendingin",
    title: "Panduan Merawat Sistem Pendingin Mesin Truk",
    date: "2024-01-08",
    image: "https://picsum.photos/100/100?random=302",
  },
  {
    id: 203,
    url: "tanda-aki-harus-diganti",
    title: "5 Tanda Aki Truk Harus Segera Diganti",
    date: "2024-01-05",
    image: "https://picsum.photos/100/100?random=303",
  },
  {
    id: 204,
    url: "cara-menghemat-bbm-truk",
    title: "7 Cara Menghemat BBM Truk hingga 30%",
    date: "2024-01-03",
    image: "https://picsum.photos/100/100?random=304",
  },
]);

// Categories for random insertion
const categories = ref([
  { id: 1, name: "Sparepart Engine", url: "sparepart-engine" },
  { id: 2, name: "Sparepart Chassis", url: "sparepart-chassis" },
  { id: 3, name: "Filter", url: "filter" },
  { id: 4, name: "Ban & Velg", url: "ban-velg" },
  { id: 5, name: "Oli & Pelumas", url: "oli-pelumas" },
  { id: 6, name: "Sistem Kelistrikan", url: "sistem-kelistrikan" },
]);

// Share buttons
const shareButtons = [
  {
    name: "facebook",
    icon: "logos:facebook",
    url: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  {
    name: "twitter",
    icon: "skill-icons:twitter",
    url: "https://twitter.com/intent/tweet?text=",
  },
  {
    name: "linkedin",
    icon: "logos:linkedin-icon",
    url: "https://www.linkedin.com/shareArticle?mini=true&url=",
  },
  {
    name: "pinterest",
    icon: "logos:pinterest",
    url: "https://pinterest.com/pin/create/button/?url=",
  },
  {
    name: "whatsapp",
    icon: "logos:whatsapp-icon",
    url: "https://wa.me/?text=",
  },
];

// ==================== COMPUTED ====================
// Processed content with dynamic insertions (only if article exists)
const processedContent = computed(() => {
  if (!article.value?.content) return "";

  try {
    // Parse HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(article.value.content, "text/html");

    // Get all paragraphs
    const paragraphs = Array.from(doc.querySelectorAll("p"));
    const validParagraphs = paragraphs.filter((p) => p.textContent?.trim());

    const totalParagraphs = validParagraphs.length;
    const middlePosition = Math.ceil(totalParagraphs / 2);
    let paragraphCount = 0;

    // Create a wrapper div
    const wrapper = document.createElement("div");

    // Iterate through child nodes
    Array.from(doc.body.childNodes).forEach((node) => {
      wrapper.appendChild(node.cloneNode(true));

      // Check if this node is a paragraph and valid
      if (node.nodeType === 1 && (node as Element).tagName === "P") {
        const clean = (node as Element).textContent?.trim() || "";
        if (clean) {
          paragraphCount++;

          // Insert product section at middle position (only for ID 1)
          if (paragraphCount === middlePosition && article.value?.id === 1) {
            const insertDiv = document.createElement("div");
            insertDiv.innerHTML = generateProductInsertion();
            wrapper.appendChild(insertDiv);
          }
        }
      }
    });

    return DOMPurify.sanitize(wrapper.innerHTML, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    });
  } catch (error) {
    console.error("Error processing content:", error);
    return article.value.content;
  }
});

// ==================== METHODS ====================
// Helper function to generate product insertion HTML
const generateProductInsertion = () => {
  // Random categories
  const shuffled = [...categories.value].sort(() => 0.5 - Math.random());
  const randomCategories = shuffled.slice(0, 3);

  const categoryButtons = randomCategories
    .map(
      (cat) =>
        `<a href="/c/${cat.url}" class="inline-block px-2 py-1 text-xs text-white bg-green-600 rounded hover:bg-green-700 transition-colors">${cat.name}</a>`
    )
    .join("");

  const productItems = relatedProducts.value
    .slice(0, 4)
    .map(
      (product) => `
    <div class="flex-shrink-0 w-[140px] lg:w-[180px]">
      <a href="/product/${product.url}" class="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <img src="${product.image}" alt="${product.name}" class="w-full aspect-square object-cover rounded-t-lg" loading="lazy">
        <div class="p-2">
          <p class="font-bold text-xs lg:text-sm line-clamp-2">${product.name}</p>
          <p class="text-orange-500 font-semibold text-xs lg:text-sm mt-1">${product.price}</p>
        </div>
      </a>
    </div>
  `
    )
    .join("");

  // Desktop version
  const desktop = `
    <div class="hidden lg:block my-8">
      <div class="bg-gray-50 rounded-xl p-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4 flex flex-col justify-center">
            <h4 class="font-bold text-lg mb-2">Temukan berbagai macam barang di <a href="/" class="text-orange-500 hover:underline">Trumecs.com</a></h4>
            <div class="flex flex-wrap gap-2">
              ${categoryButtons}
            </div>
          </div>
          <div class="col-span-8">
            <div class="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              ${productItems}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Mobile version
  const mobile = `
    <div class="lg:hidden my-4">
      <div class="bg-gray-50 rounded-lg p-3">
        <div class="space-y-3">
          <h6 class="font-bold text-sm">Temukan berbagai macam barang di <a href="/" class="text-orange-500 hover:underline">Trumecs.com</a></h6>
          <div class="flex flex-wrap gap-2">
            ${categoryButtons}
          </div>
          <div class="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            ${productItems}
          </div>
        </div>
      </div>
    </div>
  `;

  return desktop + mobile;
};

// Format date
const formatDate = (date: string) => {
  try {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return date;
  }
};

// Share article
const shareArticle = (share: any) => {
  if (!article.value) return;

  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(article.value.title);
  const image = encodeURIComponent(article.value.image);

  let shareUrl = "";

  switch (share.name) {
    case "facebook":
      shareUrl = `${share.url}${url}`;
      break;
    case "twitter":
      shareUrl = `${share.url}${title}&url=${url}&hashtags=trumecs,truk,sparepart`;
      break;
    case "linkedin":
      shareUrl = `${share.url}${url}&title=${title}`;
      break;
    case "pinterest":
      shareUrl = `${share.url}${url}&media=${image}&description=${title}`;
      break;
    case "whatsapp":
      shareUrl = `${share.url}${title}%20-%20${url}`;
      break;
    default:
      shareUrl = `${share.url}${url}`;
  }

  window.open(
    shareUrl,
    "_blank",
    "width=600,height=600,menubar=no,toolbar=no,resizable=yes,scrollbars=yes"
  );
};

// Handle 404 - redirect or show message
onMounted(() => {
  // If ID is not 1, we could redirect to 404 page
  if (articleId.value !== "1") {
    console.log("Article not found, showing 404 message");
    // Optionally redirect to 404 page:
    // router.push('/404')
  }
});
</script>

<!-- ==================== CHILD COMPONENTS ==================== -->
<script lang="ts">
// ArticleRowSmall Component
const ArticleRowSmall = {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  template: `
    <div class="flex gap-3 p-2">
      <div class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <img :src="article.image" :alt="article.title" class="w-full h-full object-cover">
      </div>
      <div class="flex-1">
        <h6 class="font-semibold text-sm line-clamp-2 group-hover:text-orange-500 transition-colors">{{ article.title }}</h6>
        <p class="text-xs text-gray-500 mt-1">
          <Icon name="material-symbols:calendar-today" class="inline mr-1 text-xs" />
          {{ formatDate(article.date) }}
        </p>
        <p v-if="article.views" class="text-xs text-gray-400 mt-0.5">
          <Icon name="material-symbols:visibility" class="inline mr-1 text-xs" />
          {{ article.views }}x dilihat
        </p>
      </div>
    </div>
  `,
  setup(props: any) {
    const formatDate = (date: string) => {
      try {
        return new Date(date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      } catch {
        return date;
      }
    };
    return { formatDate };
  },
};

// RequestForm Component
const RequestForm = {
  template: `
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <el-input 
          v-model="form.nama" 
          placeholder="Nama Lengkap" 
          size="large"
          :prefix-icon="Icon"
        />
        <el-input v-model="form.email" placeholder="Email" size="large" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <el-input v-model="form.perusahaan" placeholder="Nama Perusahaan" size="large" />
        <el-input v-model="form.telepon" placeholder="Nomor Telepon" size="large" />
      </div>
      <el-input
        v-model="form.permintaan"
        :rows="4"
        type="textarea"
        placeholder="Deskripsikan kebutuhan Anda..."
      />
      <div class="text-center">
        <el-button type="primary" native-type="submit" size="large" :loading="loading">
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
        // Show success message
        ElMessage({
          type: "success",
          message: "Permintaan berhasil dikirim!",
        });
        // Reset form
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

// ProductCard Component (Desktop)
const ProductCard = {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  template: `
    <Trulink :to="'/product/' + product.url" class="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
      <div class="aspect-square overflow-hidden rounded-t-lg">
        <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
      </div>
      <div class="p-3">
        <h4 class="font-semibold text-sm line-clamp-2 group-hover:text-orange-500 transition-colors">{{ product.name }}</h4>
        <p class="text-orange-500 font-bold text-sm mt-1">{{ product.price }}</p>
      </div>
    </Trulink>
  `,
};

// ProductCardMobile Component
const ProductCardMobile = {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  template: `
    <Trulink :to="'/product/' + product.url" class="block bg-white rounded-lg shadow-sm">
      <div class="aspect-square overflow-hidden rounded-t-lg">
        <img :src="product.image" :alt="product.name" class="w-full h-full object-cover">
      </div>
      <div class="p-2">
        <h4 class="font-semibold text-xs line-clamp-2">{{ product.name }}</h4>
        <p class="text-orange-500 font-bold text-xs mt-1">{{ product.price }}</p>
      </div>
    </Trulink>
  `,
};
</script>

<style scoped></style>
