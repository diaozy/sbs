//index.js
var data = require('../../utils/data.js').songs3;

Page({
	data: {
		imgUrls: [
			'../../images/ad4.jpg',
			'../../images/ad2.jpg',
			'../../images/ad4.jpg',
		]
	},

	onLoad: function() {
		var rs = [],
			idsMap = {},
			keys = Object.keys(data),
			len = keys.length;

		for (var i = 0; i < len; i++) {
			var k = keys[i];

			rs.push(Object.assign({
				id: k,
			}, data[k]));

			idsMap[k] = {
				preid: i > 0 ? keys[i - 1] : 0,
				nextid: i < len - 1 ? keys[i + 1] : 0
			}
		}

		idsMap[keys[0]].preid = keys[len - 1];
		idsMap[keys[len - 1]].nextid = keys[0];

		this.setData({
			recommends: rs
		});

		wx.setStorageSync('ids', idsMap);
	},
	playTap: function(e) {
		const dataset = e.currentTarget.dataset;
		wx.navigateTo({
			url: `../play3/index?id=${dataset.id}`
		})
	},

  onShareAppMessage: function () {
    return {
      title: '新概念英语听力',
      path: '/pages/book3/index',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },

})