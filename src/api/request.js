const axios = require("axios");

const ipInfoUrl = 'https://api.vore.top/api/IPdata'

const getInfo = async () => {
    const res = await axios.request({
        method: 'GET',
        url: ipInfoUrl,
    })

    const { adcode, ipinfo } = res.data;

    console.log("调用IPinfo 查询start");
    console.log('当前Action的IP地址信息:', ipinfo?.text);
    console.log('当前Action的位置信息:', adcode?.o);
    console.log("调用IPinfo 查询end");

    return `当前Action服务器的IP地址是: ${ipinfo?.text}, 位置在: ${adcode?.o}`;
}

const getHitokoto = async () => {
    const res = await axios.request({
        method: 'GET',
        url: 'https://v1.hitokoto.cn',
    });

    console.log("调用Hitokoto 查询start");
    console.log('Hitokoto:', res.data);
    console.log("调用Hitokoto 查询end");

    return res.data.hitokoto;
}

module.exports = {
    getInfo,
    getHitokoto
};