import { filterMenuButtons, findAuthorizedButtons, offFindAuthorizedButtons, emitFindAuthorizedButtons } from '@/utils/authorized';

export default {
  data() {
    return {
      authorizedButtonStr: '查询、新建、删除、编辑、查看详情、导出',
    };
  },
  created() {
    console.log('mixins -> ', this.authorizedButtonStr)
    this.findAuthorizedButtons();
    this.emitFindAuthorizedButtons();
  },
  methods: {
    findAuthorizedButtons,
    offFindAuthorizedButtons,
    emitFindAuthorizedButtons,
  },
  beforeDestroy() {
    this.offFindAuthorizedButtons();
    console.log('destroy -> ',)
  }
};
