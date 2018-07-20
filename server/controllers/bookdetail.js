const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {id} = ctx.request.query
    const detali = await mysql('books')
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .where('id', id)
        .first()
    const info = JSON.parse(detali.user_info)
    ctx.state.data = Object.assign({}, detali, {
        tags: detali.tags.split(','),
        summary: detali.summary.split('\n'),
        user_info: {
            nickName: info.nickName,
            avatarUrl: info.avatarUrl
        }
    })
    mysql('books').where('id', id).increment('count', 1)
}
