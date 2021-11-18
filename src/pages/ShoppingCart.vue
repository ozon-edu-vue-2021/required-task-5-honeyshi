<template>
  <div>
    <PageHeader title="Корзина" @back="() => $router.go(-1)">
      <template slot="extra">
        <Button type="primary" size="large" @click="showModal">
          Перейти к оформлению
        </Button>
        <Statistic title="Итог" :value="getTotal">
          <template #suffix>
            <span>₽</span>
          </template>
        </Statistic>
      </template>
    </PageHeader>
    <List item-layout="horizontal" size="small" :data-source="shoppingCart">
      <Item slot="renderItem" slot-scope="product">
        <Meta>
          <span slot="title">{{ product.name }}</span>
          <img
            width="150"
            slot="avatar"
            :src="require(`@/assets/images/${product.image}`)"
          />
          <template slot="description">
            <span> {{ product.price }} ₽ </span>
            <InputNumber
              :defaultValue="product.qty"
              :min="1"
              @change="(value) => onChangeQty(product, value)"
            />
          </template>
        </Meta>
        <Button
          slot="extra"
          size="small"
          icon="close"
          @click="removeFromCart(product.id)"
        />
      </Item>
    </List>
    <Modal
      v-model="visible"
      title="Ваш заказ"
      okText="Подтвердить"
      cancelText="Отменить"
      @ok="closeModal"
    >
      <List item-layout="horizontal" size="small" :data-source="shoppingCart">
        <Item slot="renderItem" slot-scope="product">
          <Meta>
            <span slot="title">{{ product.name }}</span>
            <img
              width="50"
              slot="avatar"
              :src="require(`@/assets/images/${product.image}`)"
            />
            <div slot="description" class="modal-total">
              <span> {{ product.price }} ₽ x {{ product.qty }} </span>
              <span> {{ product.price * product.qty }} ₽ </span>
            </div>
          </Meta>
        </Item>
      </List>
    </Modal>
  </div>
</template>

<script>
import {
  List,
  PageHeader,
  Button,
  InputNumber,
  Statistic,
  Modal,
} from "ant-design-vue";
import { mapState, mapMutations, mapGetters } from "vuex";

const { Item } = List;
const { Meta } = Item;

export default {
  name: "ProductListing",
  components: {
    Button,
    List,
    Item,
    PageHeader,
    Meta,
    InputNumber,
    Statistic,
    Modal,
  },
  computed: {
    ...mapState(["shoppingCart"]),
    ...mapGetters(["getTotal"]),
  },
  methods: {
    ...mapMutations(["removeFromCart"]),
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
    onChangeQty(product, value) {
      const newProduct = {
        ...product,
        qty: value,
      };
      this.$store.commit("updateProduct", newProduct);
    },
  },
  data() {
    return {
      visible: false,
    };
  },
};
</script>

<style scoped>
.modal-total {
  display: flex;
  justify-content: space-between;
}
</style>