//模拟新闻数据
const news = [
  {id: '264698',
  title: '省退役军人事务厅来校交流对接工作',
  poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg',
  content: ' 8月19日，省退役军人事务厅二级巡视员蔡元和、办公室主任刘恒贵、就业创业处副处长钟俊武一行来校就联合共建安徽退役军人学院事宜进行交流对接。校党委常委、副校长陆林，芜湖市退役军人事务局党组成员、副局长张桂芬，学校办公室、人事处、教务处、招就处、学生处、研究生院、体育学院负责同志参加会议。',
  add_date: '2022-08-19'},
  {id: '304083',
  title: '《光明日报》刊发我校研究员王顺理论文章《不断提高理论素养》',
  poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage2.jpg',
  content: ' 8月9日，《光明日报》第06版"学习贯彻习近平新时代中国特色社会主义思想专刊"版面长篇幅刊发了我校中国特色社会主义理论体系研究中心特约研究员、马克思主义学院博士生王顺题为《不断提高理论素养》的理论文章。文章从"理论素养坚实，才能理想信念坚定""克服前进道路上的各种困难，需要具备扎实的理论素养""提升理论素养，必须学懂弄通做实党的创新理论"3个方面全面阐述了不断提高理论素养、坚持用党的创新理论武装头脑的重要性。文章指出，新征程上，面对具有新的历史特点的伟大斗争，迫切需要我们学懂弄通做实党的创新理论，以扎实的理论素养提升战略定力、斗争能力，从而不断取得新的伟大胜利。',
  add_date: '2022-08-09'},
  {id: '305670',
  title: '我校在第八届安徽省"互联网+"大学生创新创业大赛再创佳绩',
  poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage3.jpg',
  content: '7月4日—8月10日，由安徽省教育厅、合肥市人民政府、淮北市人民政府联合主办的第八届安徽省"互联网+"大学生创新创业大赛暨中国国际"互联网+"大学生创新创业大赛选拔赛在线上举办。我校参赛项目团队历经省级复赛网评、决赛路演答辩、金奖排位赛等多轮次比拼，斩获金奖3项、银奖10项、铜奖23项，其中3个项目由省赛组委会推荐入围国赛。',
  add_date: '2022-08-11'},
  // ===== 新增的三条新闻资讯 =====
  {id: '2026001',
  title: '习近平主持召开中央全面深化改革委员会第二十七次会议',
  poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg',
  content: '中共中央总书记、国家主席、中央军委主席习近平9月6日下午主持召开中央全面深化改革委员会第二十七次会议，审议通过了《关于健全社会主义市场经济条件下关键核心技术攻关新型举国体制的意见》、《关于深化院士制度改革的意见》、《关于全面加强资源节约工作的意见》、《关于进一步深化改革促进乡村医疗卫生体系健康发展的意见》、《关于深化国有文艺院团改革的实施意见》等文件。习近平在主持会议时强调，要发挥我国社会主义制度能够集中力量办大事的显著优势，强化党和国家对重大科技创新的领导，充分发挥市场机制作用，围绕国家战略需求，优化配置创新资源，强化国家战略科技力量，大幅提升科技攻关体系化能力，在若干重要领域形成竞争优势、赢得战略主动。',
  add_date: '2022-09-06'},
  {id: '2026002',
  title: '我国成功发射高分十三号02星 卫星顺利进入预定轨道',
  poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage2.jpg',
  content: '9月7日13时57分，我国在太原卫星发射中心使用长征四号丙运载火箭，成功将高分十三号02星发射升空，卫星顺利进入预定轨道，发射任务获得圆满成功。该卫星主要用于国土普查、农作物估产、环境治理、气象预警预报和综合防灾减灾等领域，可为国民经济建设提供信息服务。此次任务是长征系列运载火箭第436次飞行。',
  add_date: '2022-09-07'},
  {id: '2026003',
  title: '2022年国家网络安全宣传周在合肥开幕',
  poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage3.jpg',
  content: '9月5日上午，2022年国家网络安全宣传周开幕式暨网络安全技术高峰论坛在安徽合肥举行。本届宣传周以"网络安全为人民，网络安全靠人民"为主题，由中央宣传部、中央网信办、教育部、工业和信息化部、公安部、中国人民银行、国家广播电视总局、全国总工会、共青团中央、全国妇联等十部门联合举办。宣传周期间，将举办网络安全博览会、网络安全技术高峰论坛、网络安全教育云课堂、网络安全赛事等重要活动，并组织开展校园日、电信日、法治日、金融日、青少年日、个人信息保护日等主题日活动。',
  add_date: '2022-09-05'}
];

//获取新闻列表
function getNewsList() {
  let list = [];
  for (var i = 0; i < news.length; i++) {
    let obj = {};
    obj.id = news[i].id;
    obj.poster = news[i].poster;
    obj.add_date = news[i].add_date;
    obj.title = news[i].title;
    list.push(obj);
  }
  return list; //返回新闻列表
}

//获取新闻内容
function getNewsDetail(newsID) {
  let msg = {
    code: '404', //没有对应的新闻
    news: {}
  };
  for (var i = 0; i < news.length; i++) {
    if (newsID == news[i].id) { //匹配新闻id编号
      msg.code = '200'; //成功
      msg.news = news[i]; //更新当前新闻内容
      break;
    }
  }
  return msg; //返回查找结果
}

// ===== 以下为新增的登录相关方法 =====

// 检查登录状态
function checkLoginStatus() {
  try {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo && userInfo.nickName) {
      return {
        isLogin: true,
        userInfo: userInfo
      }
    }
    return {
      isLogin: false,
      userInfo: null
    }
  } catch (error) {
    console.error('检查登录状态失败:', error)
    return {
      isLogin: false,
      userInfo: null
    }
  }
}

// 保存用户信息
function saveUserInfo(userInfo) {
  try {
    wx.setStorageSync('userInfo', userInfo)
    wx.setStorageSync('isLogin', true)
    return true
  } catch (error) {
    console.error('保存用户信息失败:', error)
    return false
  }
}

// 退出登录
function logout() {
  try {
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('isLogin')
    return true
  } catch (error) {
    console.error('退出登录失败:', error)
    return false
  }
}

// 获取用户信息（含授权）
function getUserProfile() {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '用于完善个人资料',
      success: (res) => {
        console.log('获取用户信息成功:', res.userInfo)
        saveUserInfo(res.userInfo)
        resolve({
          success: true,
          userInfo: res.userInfo
        })
      },
      fail: (err) => {
        console.error('获取用户信息失败:', err)
        reject({
          success: false,
          error: err
        })
      }
    })
  })
}

// 获取微信登录code（用于后端验证）
function wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        if (res.code) {
          console.log('获取登录code成功:', res.code)
          resolve({
            success: true,
            code: res.code
          })
        } else {
          reject({
            success: false,
            error: '获取登录code失败'
          })
        }
      },
      fail: (err) => {
        reject({
          success: false,
          error: err
        })
      }
    })
  })
}

// 对外暴露接口
module.exports = {
  getNewsList: getNewsList,
  getNewsDetail: getNewsDetail,
  checkLoginStatus: checkLoginStatus,
  saveUserInfo: saveUserInfo,
  logout: logout,
  getUserProfile: getUserProfile,
  wxLogin: wxLogin
}