
<script>
import { mapActions } from 'vuex'
import BAlert from 'bootstrap-vue/es/components/alert/alert'
export default {
  name: 'alert',
  extends: {
    ...BAlert
  },
  props: [
    'message_id'
  ],
  data () {
    return {

    }
  },

  methods: {
    ...mapActions([
      'popMessage'
    ])
  },

  mounted () {
    let _this = this
    setInterval(function () {
      if (_this.show === 0) {
        _this.popMessage(_this.message_id)
      }
    }, 1000)
  }

}
</script>

<style lang="scss" scoped>
</style>
