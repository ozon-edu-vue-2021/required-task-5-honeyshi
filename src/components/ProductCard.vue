<template>
  <Card>
    <img slot="cover" :src="require(`@/assets/images/${image}`)" />
    <Meta :title="productName">
      <template slot="description">
        <span> {{ price }} ₽ </span>
        <InputNumber v-model="qty" :min="1" />
      </template>
    </Meta>
    <template slot="actions" class="ant-card-actions">
      <Button
        type="primary"
        @click="
          $emit('click-add', {
            name: productName,
            image: image,
            price: price,
            id: id,
            qty: qty,
          })
        "
        >В корзину</Button
      >
      <Button
        :class="favouriteClass"
        type="link"
        icon="heart"
        @click="toggleFavourite(id)"
      />
    </template>
  </Card>
</template>

<script>
import { Card, Button, InputNumber } from "ant-design-vue";
import { mapMutations } from "vuex";

const { Meta } = Card;

export default {
  name: "ProductCard",
  components: { Button, Card, Meta, InputNumber },
  props: {
    image: {
      type: String,
      default: "",
    },
    productName: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
      default: -1,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapMutations(["toggleFavourite"]),
  },
  computed: {
    favouriteClass() {
      return this.favourite ? "favourite-button selected" : "favourite-button";
    },
  },
  data() {
    return {
      qty: undefined,
    };
  },
};
</script>

<style scoped>
.ant-card {
  width: 15rem;
}
.favourite-button {
  color: rgba(0, 0, 0, 0.65);
}
.favourite-button.selected {
  color: #ff4d4f;
}
.favourite-button:hover {
  color: #ff4d4f;
}
</style>