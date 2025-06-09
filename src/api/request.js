const axios = require("axios");

const ipInfoUrl = 'https://api.vore.top/api/IPdata'

const getInfo = async () => {
    const res = await axios.request({
        method: 'GET',
        url: ipInfoUrl,
    })

    const { adcode, ipinfo } = res.data;

    console.warn('当前用户访问的IP地址信息:', ipinfo?.text);
    console.warn('当前用户位置信息:', adcode?.o);

    return `当前用户访问的IP地址信息: ${ipinfo?.text}, 当前用户位置信息: ${adcode?.o}`;
}

module.exports = getInfo;