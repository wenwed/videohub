## 视频网站

管理员注册，管理员登录，视频种类管理，用户注册，用户登录，验证码，添加视频，播放视频，审核视频，视频热榜

###  server

对密码要进行加盐加密（bcrypt）、验证码（svg-captcha）

### admin

管理员注册，管理员登录，视频种类管理，审核视频

### client

用户注册，用户登录，验证码，添加视频，播放视频，视频热榜

#### 数据库
##### 管理员表（admins）

| 字段名         | 中文含义   | 类型及长度  | 备注                   |
| -------------- | ---------- | ----------- | ---------------------- |
| ADID           | 管理员编号 | Int         | 不能为null，自增，主键 |
| admin_name     | 管理员姓名 | Char，100位 | 不能为null，不能重复   |
| admin_password | 管理员密码 | Char，100位 | 不能为null             |

##### 用户表（users）

| 字段名        | 中文含义     | 类型及长度  | 备注                   |
| ------------- | ------------ | ----------- | ---------------------- |
| USID          | 用户编号     | int         | 不能为null，自增，主键 |
| user_name     | 用户昵称     | Char，100位 | 不能为null，不能重复   |
| user_password | 用户密码     | Char，100位 | 不能为null             |
| user_poster   | 用户头像地址 | Char，100位 | 不能为null             |
| register_date | 注册时间     | Datetime    | 不能为null             |
| user_descripe | 用户描述     | Char，300位 |                        |

##### 视频表（videos）

| 字段名         | 中文含义     | 类型及长度  | 备注                          |
| -------------- | ------------ | ----------- | ----------------------------- |
| VDID           | 视频编号     | int         | 不能为null，自增,主键         |
| video_poster   | 视频封面     | Char，100位 | 不能为null                    |
| video_url      | 视频链接     | Char，100位 | 不能为null                    |
| video_num      | 视频播放次数 | int         | 不能为null，初始值为0         |
| video_title    | 视频标题     | Char，100位 | 不能为null                    |
| video_descripe | 视频描述     | Char，300位 | 不能为null                    |
| video_type     | 视频种类     | int         | 不能为null，VideoType表的主键 |
| video_status   | 视频审核状态 | int         | 不能为null                    |
| video_owner    | 视频作者     | int         | 不能为null                    |
| video_date     | 视频发表时间 | Datetime    | 不能为null                    |

##### 视频种类表(videoTypes)

| 字段名        | 中文含义     | 类型及长度  | 备注                   |
| ------------- | ------------ | ----------- | ---------------------- |
| VTID          | 视频类型编号 | int         | 不能为null，自增，主键 |
| type_tag      | 视频类型标签 | Char，100位 | 不能为null             |
| type_descripe | 视频类型描述 | Char，300位 | 不能为null             |



#### api设计

 + 管理员部分

| 管理员重复姓名查询 |  |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/admin/nameuse?name=wenwd |
| 简要描述 | 查询管理员姓名是否被使用 |
| 请求方式 | get |
| 请求参数 |                                                    |
| 返回示例 | `{ code: 200, msg: "姓名未被使用", flag: true }` |

| 管理员注册   |  |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/admin/register |
| 简要描述 | 发送管理员信息到服务端，进行管理员的注册 |
| 请求方式 | post |
| 请求参数 | `{ admin_name: "wenwd", admin_password: "wenwd114514" }` |
| 返回示例 | `{ code: 200, msg: "注册成功" }` |


| 管理员登录 | |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/admin/login |
| 简要描述 | 将管理员填写的登录信息与数据库中的信息对比，返回对比信息 |
| 请求方式 | post |
| 请求参数 | `{ admin_name: "wenwd", admin_password: "wenwd114514" }` |
| 返回示例 | `{ code: 200, msg: "登录成功"}` |

| 未审核视频列表 | |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/admin/revideolist |
| 简要描述 | 管理获取未审核的视频列表 |
| 请求方式 | get |
| 请求参数 | `{}` |
| 返回示例 | `{}` |

| 管理审核视频结果 | |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/admin/revideo |
| 简要描述 | 管理员发送审核视频的结果 |
| 请求方式 | post |
| 请求参数 | `{}` |
| 返回示例 | `{}` |

+ 视频标签部分

| 视频标签列表 | |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/admin/tyvideo/all |
| 简要描述 | 管理员获取视频标签列表 |
| 请求方式 | get |
| 请求参数 | `{}` |
| 返回示例 | `{}` |

| 添加视频标签列表 | |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/admin/tyvideo/add |
| 简要描述 | 发送要添加的视频标签信息 |
| 请求方式 | post |
| 请求参数 | |
| 返回示例 | |

| 修改视频标签列表 | |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/tyvideo/update |
| 简要描述 | 发送要修改的视频标签信息 |
| 请求方式 | post |
| 请求参数 | `{}` |
| 返回示例 | `{}` |

| 删除视频标签列表 | |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/tyvideo/delete |
| 简要描述 | 发送要删除的视频标签信息 |
| 请求方式 | post |
| 请求参数 | `{}` |
| 返回示例 | `{}` |

 + 用户部分

| 用户重复姓名查询 |  |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/user/nameuse |
| 简要描述 | 查询用户姓名是否被使用 |
| 请求方式 | post |
| 请求参数 | `{ user_name: "wenwd"}` |
| 返回示例 | `{ code: 200, msg: "姓名未被使用", flag: true }` |


| 用户注册 |  |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/user/register |
| 简要描述 | 将用户填写的用户信息传入服务器，返回注册信息 |
| 请求方式 | post |
| 请求参数 | `{ user_name: "wenwd",  user_password: "wenwd114514" }` |
| 返回示例 | `{ code: 200, msg: "注册成功" }` |

| 用户登录 | |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/user/login |
| 简要描述 | 将用户填写的登录信息传入服务端，返回对比信息 |
| 请求方式 | post |
| 请求参数 | `{ user_name: "wenwd",  user_password: "wenwd114514" }` |
| 返回示例 | `{ code: 200, msg: "登录成功", userinfo: { user_name: "wenwd", user_poster: "1919810.jpg", user_descripe: "你回家了，我在等你呢" } }` |

| 用户信息修改 | |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/user/updateinfo |
| 简要描述 | 将需要修改的用户信息传入服务端 |
| 请求方式 | post |
| 请求参数 | `{ USID: 1, user_name: "wenwd", user_poster: "1919810.jpg",  user_password: "wenwd114514", user_descripe: "你回家了，我在等你呢" }` |
| 返回示例 | `{ code: 200, msg: "修改成功" }` |

| 用户上传头像 | |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/user/poster |
| 简要描述 | 将用户头像上传到服务器 |
| 请求方式 | post |
| 请求参数 | 114514.jpg |
| 返回示例 | `{ code: 200, user_poster: "1919810.jpg" }` |

 + 视频部分

| 用户上传视频文件 | |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/upload/video |
| 简要描述 | 将用户的视频文件上传到服务端 |
| 请求方式 | post |
| 请求参数 | |
| 返回示例 | `{ code: 200, video_url: "1919810.mp4" }` |

| 用户上传视频封面文件 |  |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/upload/poster |
| 简要描述 | 将用户的视频封面上传到服务端 |
| 请求方式 | post |
| 请求参数 |  |
| 返回示例 | `{ code: 200, video_poster: "1919810.jpg" }` |

| 用户添加视频 | |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/video/add |
| 简要描述 | 将用户填写的视频信息上传到服务器 |
| 请求方式 | post |
| 请求参数 | |
| 返回示例 | |

| 用户修改视频 | |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/video/update |
| 简要描述 | 将用户修改的视频信息上传到服务器 |
| 请求方式 | post |
| 请求参数 | |
| 返回示例 | |

| 用户删除视频 | |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/video/del |
| 简要描述 | 将用户要删除的视频上传到服务器 |
| 请求方式 | post |
| 请求参数 | |
| 返回示例 | |

| 用户视频列表 | |
| -------- | -------- |
| 请求URL  | http://127.0.0.1:8633/api/video/list |
| 简要描述 | 返回用户发表的视频列表 |
| 请求方式 | get |
| 请求参数 | |
| 返回示例 | |

|  | |
| -------- | -------- |
| 请求URL  | |
| 简要描述 | |
| 请求方式 | |
| 请求参数 | |
| 返回示例 | |