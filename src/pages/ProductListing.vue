<template>
  <div>
    <PageHeader title="Список товаров">
      <template slot="extra">
        <router-link to="/favourites">
          <Button type="danger" icon="heart" size="large"> Избранное </Button>
        </router-link>
        <router-link to="/shopping-cart">
          <Badge :count="getProductsInShoppingCartCount">
            <Button type="primary" icon="shopping-cart" size="large">
              Корзина
            </Button>
          </Badge>
        </router-link>
      </template>
    </PageHeader>
    <List :grid="{ gutter: 16, column: 4 }" :data-source="products">
      <Item slot="renderItem" slot-scope="product">
        <ProductCard
          :image="product.image"
          :price="product.price"
          :productName="product.name"
          :id="product.id"
          :favourite="product.favourite"
        />
      </Item>
    </List>
  </div>
</template>

<script>
import { List, PageHeader, Button, Badge } from "ant-design-vue";
import { mapState, mapMutations, mapGetters } from "vuex";

const { Item } = List;

import ProductCard from "../components/ProductCard.vue";
export default {
  name: "ProductListing",
  components: { List, Item, PageHeader, Button, Badge, ProductCard },
  computed: {
    ...mapState(["products"]),
    ...mapGetters(["getProductsInShoppingCartCount"]),
  },
  methods: {
    ...mapMutations(["addToCart"]),
  },
};
</script>