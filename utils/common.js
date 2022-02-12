const mapActions = {
  update: {
    alias: "u", //别名
    description: "更新模板", // 描述
    examples: [
      //用法
      "xxy_sy_template update",
    ],
  },
  download:{
    alias:"d",
    description: "下载模板",
    examples: [
      "xxy_sy_template download"
    ]
  }
};

module.exports = {
  mapActions,
};
