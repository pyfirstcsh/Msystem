var Koa = require("koa");
var Router = require("koa-router");
const { koaBody } = require("koa-body");
const static = require("koa-static");
const path = require("path");
const { v4: uuidv4 } = require('uuid')
const session = require("koa-session");
var app = new Koa();
var router = new Router();
const staticPath = path.resolve(__dirname, "static");
app.use(static(staticPath));
const { StuData } = require('./makeData');
app.keys = ["i love myself"];
const { CONFIG } = require('./koa_session')
app.use(session(CONFIG, app));

// 用户登录信息验证
async function checkUser(ctx, next) {
    const { user, pwd } = ctx.request.body;
    let isCorrect = true;
    if (user === "LoveM" && pwd === "loveyourself") {
        isCorrect = true;
    }
    else {
        isCorrect = false;
    }
    if (isCorrect) {
        // 写入 koa-session
        ctx.session.user = user;
        console.log("login success", ctx.session.user);
        ctx.body = { code: 0, message: "登录成功" };
    } else {
        ctx.body = { code: -1, message: "密码错误" };
    }
    await next();
}
// 删除用户登录信息
async function deleteUser(ctx, next) {
    ctx.session.user = null;
    console.log("logout success");
    ctx.body = { code: 0, message: "删除成功" };
    await next();
}

// 判断用户是否已经登陆
async function getUserInfo(ctx, next) {
    if (!ctx.session.user) {
        console.log("no login");
        ctx.body = { code: -2, message: "没有登录" };
        return;
    }
    else {
        console.log("be login:", ctx.session.user);
        ctx.body = { code: 0, message: "已登录" };
    }
    await next();
}
// 通过page,pageSize获取学生信息列表
async function getStuList(ctx, next) {
    const { page, pageSize } = ctx.query;
    console.log("get message from page:", page, " pageSize:" + pageSize);
    const lenth = StuData.length;
    const optionData = StuData.slice((page - 1) * pageSize, page * pageSize);
    ctx.body = {
        code: 0,
        total: lenth,
        list: optionData,
    };
    await next();
}
// 通过id唯一确定学生信息
async function getStuById(ctx, next) {
    const { id } = ctx.query;
    const stuM = StuData.find(item => item.id == id);
    console.log("getById: " + id, ".index:", StuData.findIndex(item => item.id === id))
    ctx.body = {
        code: 0,
        stuM: stuM,
    };
    await next();
}
// 通过Name查找学生信息
async function getStuByName(ctx, next) {
    const { name } = ctx.query;
    console.log("getByName: " + name, ".index:", StuData.findIndex(item => item.name === name))
    const stuMs = StuData.filter(item => {
        return item.name === name;
    });
    const length = stuMs.length;
    console.log(stuMs.length);
    if (length !== 0) {
        ctx.body = {
            code: 0,
            total: length,
            stuMs: stuMs,
            message: "搜索用户成功"
        };
    } else {
        ctx.body = {
            code: -1,
            total: length,
            stuMs: stuMs,
            message: "搜索用户失败"
        };
    }
    await next();
}
// 通过sex筛选学生信息
async function getStuBysex(ctx, next) {
    let stuMs = StuData;
    const { sex } = ctx.query;
    if (sex !== "全部性别") {
        stuMs = StuData.filter(item => {
            return item.sex === sex;
        });
    }
    const length = stuMs.length;
    if (length !== 0) {
        console.log("get successfully by ", sex);
        ctx.body = {
            code: 0,
            total: length,
            stuMs: stuMs,
            message: "获取用户成功"
        };
    } else {
        ctx.body = {
            code: -1,
            total: length,
            stuMs: stuMs,
            message: "获取用户失败"
        };
    }
    await next();
}
// 创建学生信息，赋予新的id
async function createStu(ctx, next) {
    const { data } = ctx.request.body;
    let uuid = uuidv4();
    data.id = uuid;
    StuData.unshift(data);
    console.log("createStu successfully:", data);
    ctx.body = { code: 0, message: "创建用户成功" };
    await next();
}

// 删除学生信息，通过id确定
async function deteleStu(ctx, next) {
    const { id } = ctx.request.body;
    console.log("delete stu" + id);
    console.log("index" + StuData.findIndex(item => {
        return item.id === id;
    }
    ));
    StuData.splice(StuData.findIndex(item => item.id === id), 1);
    ctx.body = { code: 0, message: "删除用户成功" };
    await next();
}
// 更新学生信息，通过id确定
async function updateStu(ctx, next) {
    const { id, data } = ctx.request.body;
    data.id = id;
    console.log(StuData.findIndex(item => item.id === id));
    StuData.splice(StuData.findIndex(item => item.id === id), 1, data);
    console.log("updateStu successfully");
    ctx.body = { code: 0, message: "修改用户成功" };
    await next();
}

router.post("/api/user/login", checkUser);

router.post("/api/user/logout", deleteUser);

router.get("/api/stu/list", getUserInfo, getStuList);

router.get("/api/stu/id", getUserInfo, getStuById);

router.get("/api/stu/name", getUserInfo, getStuByName);

router.get("/api/stu/sex", getUserInfo, getStuBysex);

router.post("/api/stu/create", getUserInfo, createStu);

router.post("/api/stu/delete", getUserInfo, deteleStu);

router.post("/api/stu/update", getUserInfo, updateStu);

app.use(koaBody({ multipart: true }))

app.use(router.routes()).use(router.allowedMethods());

app.listen(3001);
