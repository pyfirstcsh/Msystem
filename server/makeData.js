const { faker } = require('@faker-js/faker');
const StuData = [];
// 随机生成信息
function makeRandomStuData() {
    return {
        id: faker.datatype.uuid(),
        name: faker.internet.userName(),
        major: faker.helpers.arrayElement(['计算机科学与技术', '物联网工程', '网络安全', '电子信息技术']),
        grade: faker.helpers.arrayElement(['2019', '2020', '2021', '2022']),
        sex: faker.helpers.arrayElement(['男', '女', '未知']),
        phone: faker.phone.number('+86 1##########'),
        email: faker.internet.email(),
        headPic: faker.image.avatar(),
    }
}
// 生成12默认信息
Array.from({ length: 12 }).forEach(() => {
    StuData.push(makeRandomStuData());
});

module.exports = {
    StuData
}