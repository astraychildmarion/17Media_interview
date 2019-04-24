<template lang="pug">
  #app
    .header-wrapper
      h1 Daily Drink
    .container
      .order-form-wrapper
        form
          .order-form-group
            label 飲料名稱
            input(
              v-model='name'
              ref='drinkName'
            )
          .order-form-group
            label 價格
            input(
              v-model='price'
              ref='drinkPrice'
              )
          .order-form-group
            label 冰塊
            select(
              v-model='ice'
              ref='drinkIce'
              )
              option(disabled) 選擇冰塊
              option(v-for='(item, index) in iceOption') {{ item }}
          .order-form-group
            label 甜度
            select(
              v-model='sugar'
              ref='drinkSugar'
              )
              option(disabled) 選擇糖度
              option(v-for='(item, index) in sugarOption') {{ item }}
          .order-form-group
            label 備註
            textarea(v-model='orderNote') 
          button(
            @click='addOrder'
            type='button') 訂下去
      .order-wrapper
        .order(v-for='(order, index) in orders' v-show='order.name !== ""',)
          button.delete-btn(
            @click='removeOrder(order)'
            type='button'
            )
            span ×
          h5 {{ order.name }}
            span.price {{ order.price }} 元
          p.optional
            span {{ order.ice }}
            span {{ order.sugar }}
          p.note {{ order.note }}
</template>
<script>
export default{
  data () {
    return {
      name: '',
      price: '',
      orderNote: '',
      ice: '',
      sugar: '',
      iceOption: ['去冰','半冰', '正常冰'],
      sugarOption: [ '無糖','半糖','七分糖','正常甜'],
      orders: [
        {
          name: '',
          price: '',
          ice: '',
          sugar: '',
          note: '',
        }
      ],
    }
  },
  methods: {
    addOrder () {
      if ( this.name === '') {
        alert ('你沒有寫飲料名稱喔')
        this.$refs.drinkName.focus()
        return
      } else if ( this.price === '' ) {
        alert ('你忘記寫價錢了')
        this.$refs.drinkPrice.focus()
        return
      } else if ( this.ice === '') {
        alert ('填一下冰塊嘛')
        this.$refs.drinkPrice.focus()
        return
      } else if ( this.sugar === '') {
        alert ('跟我說一下要多甜')
        this.$refs.drinkSugar.focus()
        return
      } else {
        this.orders.push({
          name: this.name,
          price: this.price,
          ice: this.ice,
          sugar: this.sugar,
          note: this.orderNote
        })
      }
      this.name = ''
      this.price = ''
      this.ice = ''
      this.sugar = ''
      this.orderNote = ''
    },
    removeOrder (order) {
      let confirmQ = confirm('你要刪除這筆訂單嗎?')
      if (confirmQ) {
        let removeThis = this.orders.indexOf(order)
        this.orders.splice(removeThis, 1)
      }
    }
  },
}
</script>
<style lang="scss">
@import "reset.scss";
@import "frame.scss";
</style>

