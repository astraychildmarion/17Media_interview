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
            input(v-model='orderNote') 
          button(
            @click='addOrder'
            type='button') 訂下去
      .order-wrapper
        .order(
          v-for='(order, index) in orders'
          v-if='order.name && order.price && order.ice && order.sugar != null'
        )
          .basic
            input(
              :placeholder='order.name'
              :disabled='editNumber != index'
              v-model='order.name'
            )
            input(
            :placeholder='order.price'
            :disabled='editNumber != index'
            v-model='order.price'
            )
            input(
              disabled
              placeholder='元'
              v-show='order.price != ""'
            )
          .optional
            input(
            :placeholder='order.ice'
            :disabled='editNumber != index'
            v-model='order.ice'
            )
            input(
            :placeholder='order.sugar'
            :disabled='editNumber != index'
            v-model='order.sugar'
            )
          textarea.note(
            :placeholder='order.note'
            :disabled='editNumber != index'
            v-model='order.note'
          )
          button.delete-btn(
            @click='removeOrder(order)'
            type='button'
            )
            span ×
  
          button.edit-btn(
            @click='(editNumber == index)? editNumber = -1 : editNumber = index'
          )
            span(v-if='editNumber == -1') 修改訂單
            span(v-else) 修改完成
</template>
<script>
export default{
  data () {
    return {
      editNumber: -1,
      name: '',
      price: '',
      orderNote: '',
      ice: '',
      sugar: '',
      iceOption: ['去冰','半冰', '正常冰'],
      sugarOption: [ '無糖','半糖','七分糖','正常甜'],
      orders: [
        {
          name: null,
          price: null,
          ice: null,
          sugar: null,
          note: null,
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
    },
    editOrder (order) {
      let editNumber = this.orders.indexOf(order)
      return editNumber
    }
  },
}
</script>
<style lang="scss">
@import "reset.scss";
@import "frame.scss";
</style>

