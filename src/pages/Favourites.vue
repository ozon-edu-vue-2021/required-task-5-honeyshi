<template>
  <div>
    <PageHeader title="Избранное" @back="() => $router.go(-1)">
      <template slot="extra">
        <router-link to="/shopping-cart">
          <Button type="primary" icon="shopping-cart" size="large">
            Корзина
          </Button>
        </router-link>
        <Badge :count="getProductsInShoppingCartCount" />
      </template>
    </PageHeader>
    <List :grid="{ gutter: 16, column: 4 }" :data-source="getFavouriteProducts">
      <Item slot="renderItem" slot-scope="product">
        <ProductCard
          :image="product.image"
          :price="product.price"
          :productName="product.name"
          :id="product.id"
          :favourite="product.favourite"
          @click-add="addToCart"
        />
      </Item>
    </List>
  </div>
</template>

<script>
import { List, PageHeader, Button, Badge } from "ant-design-vue";
import { mapMutations, mapGetters } from "vuex";

const { Item } = List;

import ProductCard from "../components/ProductCard.vue";
export default {
  name: "ProductListing",
  components: { List, Item, PageHeader, Button, Badge, ProductCard },
  computed: {
    ...mapGetters(["getProductsInShoppingCartCount", "getFavouriteProducts"]),
  },
  methods: {
    ...mapMutations(["addToCart"]),
  },
};
</script>