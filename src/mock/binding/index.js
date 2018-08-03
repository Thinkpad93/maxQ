import Mock from 'mockjs';
const deviceList = [];


for (let i = 0; i < 100; i++) {
  deviceList.push(Mock.mock({
    deviceId: Mock.Random.id(),
    schoolName: Mock.Random.csentence(5, 10),
    deviceNo: "20180627GDTH001",
    mac: "00:21:4F:4D:04:ED",
    address: Mock.Random.csentence(10, 20),
    postTime: Mock.Random.date(),
    manager: Mock.Random.cname(),
    phone: "13829391939"
  }));
}


Mock.mock('/action/mod-xiaoq/showDeviceList.action', /post/i, function (options) {
  return deviceList;
});
