const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {bookid, comment, location, phone} = ctx.request.body
    const openid = 'oWOlr5VAiWJlZaqH944BvcY2P3_I'
    try {
        await mysql('comments').insert({openid, bookid, comment, location, phone})
        ctx.state.data = {
            msg: '评论成功'
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '评论失败:' + e.sqlMessage
            }
        }
    }
}
