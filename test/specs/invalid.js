/**
 * Import(s)
 */

var Vue = require('../../node_modules/vue/dist/vue')
var plugin = require('../../index')
var createInstance = require('./helper').createInstance


describe('invalid', function () {
  var vm, targetVM

  before(function () {
    Vue.config.async = false
    Vue.use(plugin)
  })

  after(function () {
    Vue.config.async = true
  })

  beforeEach(function () {
    var inputs = '<input type="text" v-model="username" v-validate="required, minLength: 4, maxLength: 16">'
      + '<input type="text" v-model="zip" v-validate="required, pattern: /^[0-9]{3}-[0-9]{4}$/"'
    vm = createInstance({
       target: inputs, data: { username: '', zip: '' }
    })
    targetVM = vm._children[0]
  })

  
  describe('init instance', function () {
    describe('validation.username.invalid', function () {
      it('should be true', function () {
        expect(targetVM.validation.username.invalid).to.be(true)
      })
    })

    describe('validation.zip.invalid', function () {
      it('should be true', function () {
        expect(targetVM.validation.zip.invalid).to.be(true)
      })
    })

    describe('invalid', function () {
      it('should be true', function () {
        expect(targetVM.invalid).to.be(true)
      })
    })
  })


  describe('pass username validation', function () {
    beforeEach(function () {
      vm.username = 'kazupon'
      vm._digest() // force update
    })

    describe('validation.username.invalid', function () {
      it('should be false', function () {
        expect(targetVM.validation.username.invalid).to.be(false)
      })
    })

    describe('validation.zip.invalid', function () {
      it('should be true', function () {
        expect(targetVM.validation.zip.invalid).to.be(true)
      })
    })

    describe('invalid', function () {
      it('should be true', function () {
        expect(targetVM.invalid).to.be(true)
      })
    })
  })


  describe('pass username and zip validation', function () {
    beforeEach(function () {
      vm.username = 'kazupon'
      vm.zip = '111-2222'
      vm._digest() // force update
    })

    describe('validation.username.invalid', function () {
      it('should be false', function () {
        expect(targetVM.validation.username.invalid).to.be(false)
      })
    })

    describe('validation.zip.invalid', function () {
      it('should be true', function () {
        expect(targetVM.validation.zip.invalid).to.be(false)
      })
    })

    describe('invalid', function () {
      it('should be true', function () {
        expect(targetVM.invalid).to.be(false)
      })
    })
  })
})
