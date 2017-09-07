function API() {
  this.VUE = {
    baseUrl: "https://www.vue-js.com/api/v1/",
    // page Number 页数
    // tab String 主题分类
    // limit Number 每一页的主题数量
    // mdrender String 当为 false 时，不渲染。默认为 true
    getTabs(tab = "all", page = 0, limit = 20, mdrender = true) {
      // all//全部
      // good//精华
      // weex//weex
      // share//分享
      // ask//问答
      return `topics?tab=${tab}&page=${page}&limit=${limit}&mdrender=${mdrender}`;
    },
    content(id) {
      return `topic/${id}`;
    },
    // 新建主题(post)
    // title String 标题
    // tab String 目前有 ask share job
    // content String 主体内容
    // 返回值示例
    // {success: true, topic_id: '5433d5e4e737cbe96dcef312'}
    newContent: `topics`,
    //收藏主题(post)
    // 参数
    // accesstoken String 用户的 accessToken
    // topic_id String 被收藏的主题id
    collect: `topic/collect`,
    // 取消收藏接收 (post)
    // 参数
    // accesstoken String 用户的 accessToken
    // topic_id String 被取消收藏的主题id
    decollect: `topic/de_collect`,
    // 用户详情(get)
    user(loginname) {
      return `user/${loginname}`;
    },
    // 验证 accessToken 的正确性(post)
    // 接收 post 参数
    // accesstoken String 用户的 accessToken
    // 如果成功匹配上用户，返回成功信息。否则 403。
    // 返回值示例
    // {success: true, loginname: req.user.loginname}
    userAccessToken: "/accesstoken",
    //获取已读和未读消息(get)
    userMessage: `messages`,
    //标记全部已读(post)
    //参数：accesstoken String
    markAll: `message/mark_all`,
    replies(topic_id) {
      // 新建评论(post)
      // accesstoken String 用户的 accessToken
      // content String 评论的主体
      // reply_id String 如果这个评论是对另一个评论的回复，请务必带上此字段。这样前端就可以构建出评论线索图。
      // 返回值示例
      // {success: true, reply_id: '5433d5e4e737cbe96dcef312'}
      return `topic/${topic_id}/replies`;
    },
    // 评论点赞(post)
    // accesstoken String
    // 接口会自动判断用户是否已点赞，如果否，则点赞；如果是，则取消点赞。点赞的动作反应在返回数据的 action 字段中，up or down。
    ups(reply_id) {
      // 为评论点赞(post)
      // accesstoken String
      // 接口会自动判断用户是否已点赞，如果否，则点赞；如果是，则取消点赞。点赞的动作反应在返回数据的 action 字段中，up or down。
      // 返回值示例
      // {"success": true, "action": "down"}
      return `reply/${reply_id}/ups`;
    }
  };
  this.NODE = {
    baseUrl: "https://cnodejs.org/api/v1/",
    // page Number 页数
    // tab String 主题分类
    // limit Number 每一页的主题数量
    // mdrender String 当为 false 时，不渲染。默认为 true
    getTabs(tab = "all", page = 0, limit = 20, mdrender = true) {
      // all//全部
      // good//精华
      // weex//weex
      // share//分享
      // ask//问答
      return `topics?tab=${tab}&page=${page}&limit=${limit}&mdrender=${mdrender}`;
    },
    content(id) {
      return `topic/${id}`;
    },
    // 新建主题(post)
    // title String 标题
    // tab String 目前有 ask share job
    // content String 主体内容
    // 返回值示例
    // {success: true, topic_id: '5433d5e4e737cbe96dcef312'}
    newContent: `topics`,
    //收藏主题(post)
    // 参数
    // accesstoken String 用户的 accessToken
    // topic_id String 被收藏的主题id
    collect: `topic/collect`,
    // 取消收藏接收 (post)
    // 参数
    // accesstoken String 用户的 accessToken
    // topic_id String 被取消收藏的主题id
    decollect: `topic/de_collect`,
    // 用户详情(get)
    user(loginname) {
      return `user/${loginname}`;
    },
    // 验证 accessToken 的正确性(post)
    // 接收 post 参数
    // accesstoken String 用户的 accessToken
    // 如果成功匹配上用户，返回成功信息。否则 403。
    // 返回值示例
    // {success: true, loginname: req.user.loginname}
    userAccessToken: "/accesstoken",
    //获取已读和未读消息(get)
    userMessage: `messages`,
    //标记全部已读(post)
    //参数：accesstoken String
    markAll: `message/mark_all`,
    replies(topic_id) {
      // 新建评论(post)
      // accesstoken String 用户的 accessToken
      // content String 评论的主体
      // reply_id String 如果这个评论是对另一个评论的回复，请务必带上此字段。这样前端就可以构建出评论线索图。
      // 返回值示例
      // {success: true, reply_id: '5433d5e4e737cbe96dcef312'}
      return `topic/${topic_id}/replies`;
    },
    // 评论点赞(post)
    // accesstoken String
    // 接口会自动判断用户是否已点赞，如果否，则点赞；如果是，则取消点赞。点赞的动作反应在返回数据的 action 字段中，up or down。
    ups(reply_id) {
      // 为评论点赞(post)
      // accesstoken String
      // 接口会自动判断用户是否已点赞，如果否，则点赞；如果是，则取消点赞。点赞的动作反应在返回数据的 action 字段中，up or down。
      // 返回值示例
      // {"success": true, "action": "down"}
      return `reply/${reply_id}/ups`;
    }
  };
  this.Local = {
    baseUrl: "http://localhost:12580/",
    // ADMIN_API------------------------------
    // user_name: String,
    // password: String
    adminRegister_post: "admin/register",
    // user_name: String,
    // password: String
    adminLogin_post: "admin/login",
    getAllAdmin_get: "admin/getAllAdmin",
    // user_name: String,
    // oldPwd: String,
    // newPwd: String
    changePassword_post: "admin/changePassword",
    singout_get: "admin/singout",

    // USER_API-------------------------------
    // account: String,
    // password: String,
    // nickname: String,
    // avatar_url: String,
    // content: String,
    // sex: String,
    // phone_number: String,
    // loves: [String],
    // qq: String,
    // github: String
    userregister_post: "user/register",
    // account: String,
    // password: String,
    userlogin_post: "user/login",
    userMessage_post: "user/userMessage",
    searchNickname_post: "user/searchNickname",
    searchAccount_post: "user/searchAccount",
    // account: String,
    // oldPwd: String,
    // newPwd: String
    userchangePassword_post: "user/changePassword",
    // account: String,
    // nickname: String
    userchangeNickname_post: "user/changeNickname",

    usersingout_get: "user/singout",

    // DOCs--------------------------------------
    getdoclist_get: "doc/getdoclist",
    // id: String
    deletedoclist_post: "doc/deletedoclist",
    // name: String,
    // knowledges: [{
    //         name: String,
    //         knowledges: [{
    //                 name: String,
    //                 url: String
    //             },
    //             {
    //                 name: String,
    //                 url: String
    //             }
    //         ]
    //     },
    //     {
    //         name: String,
    //         knowledges: [{
    //                 name: String,
    //                 url: String
    //             },
    //             {
    //                 name: String,
    //                 url: String
    //             }
    //         ]
    //     }
    // ]
    adddoclist_post: "doc/adddoclist",
    // id: String,
    // name: String,
    // knowledges: [{
    //         name: String,
    //         url: String
    //     },
    //     {
    //         name: String,
    //         url: String
    //     }
    // ]
    updatedoclist_post: "doc/updatedoclist",

    // NOTE-------------------------------------
    getallnotes_get: 'note/getAllNotes',
    // const { user_id } = fields;
    getnotes_post: 'note/getNotes',
    // const {
    //   user_id,
    //   avatar_url,
    //   nickname,
    //   note_title,
    //   note_content
    // } = fields;
    addnote_post: 'note/addNote',
    // const {
    //     encrypAuthorId,
    //     note_id,
    //     nickname,
    //     encrypUserId,
    //     content,
    //   } = fields;
    addreplie_post: 'note/addReplies',
    // const {
    //     encrypUserId,
    //     note_id
    //   } = fields;
    getOneOfNote_post :'note/getOneOfNote'
  };
}
export default new API();