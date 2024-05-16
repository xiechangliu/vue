import Mock from 'mockjs'

const Random = Mock.Random
// 设置全局延时，没有延时的话，有时候会检测不到数据变化
Mock.setup({
  timeout: '300-600'
})
// 创建一个数组用来接收模拟的数据
const mocklist = []
const count = 5;
Random.image('20x10', '#FF6600',"头像")

for (let i = 0; i < count; i++) {
  mocklist.push(Mock.mock({
    id: '@id',
    img:"@image",//头像
    name: '@cname',//姓名
    'phone|1': /^1[0-9]{10}$/,//电话
    email: '@email',//邮箱
    //'role|1': ['妈妈', '爸爸', '兄妹', '同学', '大学老师', '同事', '领导'],
    'role|1': ['家人', '同学', '老师', '同事', '领导','亲戚'],
    'education|1': ['本科', '大专', '硕士', '博士', '中专'],
    'graduationschool|1': ['西南财经', '北京交通大学', '重庆工商大学', '清华大学', '西南大学', '上海复旦大学'],
    'profession|1': ['教授', '律师', '医生', '公务员', '大学老师', '警察', '白领'],
    profile: '@cparagraph'//备注
  }))
}

// 获取用户信息列表
function getList() {
  // 若 localStorage 没有数据，则将 Mock 的数据存入
  if (!localStorage.getItem('userlist')) {
    localStorage.setItem('userlist', JSON.stringify(mocklist))
  }
  // 每次获取数据时，再从 localStorage 中拉取数据
  var userlist = JSON.parse(localStorage.getItem('userlist'))
  console.log(userlist)
  return userlist
}

// 获取单个用户信息
function getUser(options) {
  // 先从 localStorage 中拉取数据
  // var userlist = JSON.parse(localStorage.getItem('userlist'))
  var userlist = getList()
  //判断有无参数
  if (JSON.parse(options.body).query) {
    console.log("查单个")
    //查到的个数
    var sum = 0
    //查到的数据
    var user = []
    // 遍历数组，返回id 与传来 id 相当的一个对象    
    for (let index in userlist) {
      //字符串转对象再去掉所有空格
      if (userlist[index].name == JSON.parse(options.body).query.replace(/\s+/g, "")) {
        console.log("查询到了")
        //返回数组的话data.includes is not a function，数组≠proxy
        // var user=userlist[index]
        // return user
        user.push(userlist[index])
        sum++
      }
    }
    return user
  }
  else {
    console.log("查所有")
    return userlist
  }
}

// 删除用户信息
function deleteUser(options) {
  // 先从 localStorage 中拉取数据
  var userlist = JSON.parse(localStorage.getItem('userlist'))
  // 根据传递的 id 删除 用户
  for (let index in userlist) {
    // if (userlist[index].id === options.body) {
    if (userlist[index].name === JSON.parse(options.body).name) {
      userlist.splice(index, 1)
      localStorage.setItem('userlist', JSON.stringify(userlist))
    }
  }
  return {
    data: '用户删除成功'
  }
}

// 添加用户信息
function addUser(options) {
  // 先从 localStorage 中拉取数据
  var userlist = JSON.parse(localStorage.getItem('userlist'))
  // 获取传入用户信息对象，是一个字符串，需要转化为对象
  var user = JSON.parse(options.body)
  // 使用 mock 随机生成一个 id
  user.id = Random.id()
  // 将 user 插入到 userlist 中
  userlist.unshift(user)
  // 重新将 userlist 存入 localStorage 中
  localStorage.setItem('userlist', JSON.stringify(userlist))
  return {
    data: '用户添加成功'
  }
}

// 更新用户信息
function updateUser(options) {
  // 先从 localStorage 中拉取数据
  var userlist = JSON.parse(localStorage.getItem('userlist'))
  var user = JSON.parse(options.body)
  // 遍历 userlist 根据传入对象的 id 更新用户信息
  for (let index in userlist) {

    if (userlist[index].id === user.id) {
      userlist[index] = user
    }
  }
  localStorage.setItem('userlist', JSON.stringify(userlist))
  return {
    data: '用户更新成功'
  }
}

// 制作各个接口
Mock.mock('/getlist', 'get', getList)
Mock.mock('/getuser', 'post', getUser)
Mock.mock('/deleteuser', 'post', deleteUser)
Mock.mock('/adduser', 'post', addUser)
Mock.mock('/updateuser', 'post', updateUser)

// 最后将 Mock 导出
export default Mock