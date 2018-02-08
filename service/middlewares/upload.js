const fs = require('fs')
const alioss = require('../utils/alioss')
const config = require('../config/common')
const globalConfig = config[process.env.NODE_ENV || 'development']

class UploadController {
   // 图片上传到阿里云oss中间件
  static async alioss (ctx) {
    const { fields, files } = ctx.request.body
    if (!files || !files.file) {
      return ctx.error({ msg: '上传失败!' })
    }
    const { id } = fields
    const userid = ctx.cookies.get('userid')
    if (!id || !userid || id !== userid) return ctx.error({ msg: '您还没有登录哦!' })

    const isexit = await fs.existsSync(files.file.path)
    if (!isexit) return ctx.error({ msg: '上传文件时发生错误!' })

    let filekey = id + files.file.name
    if (globalConfig.alioss.folder) {
      filekey = globalConfig.alioss.folder + filekey
    }

    const result = await alioss(filekey, files.file.path)
    if (!result || !result.url) {
      return ctx.error({ msg: '上传到云端时发生错误!' })
    }

    const { url } = result
    fs.unlinkSync(files.file.path)
    if (!url) return ctx.error({ msg: '上传失败!' })
    return ctx.success({ msg: '上传成功!', data: { url, id } })
  }
}

module.exports = UploadController
