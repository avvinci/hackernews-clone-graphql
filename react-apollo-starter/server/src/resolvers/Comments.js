function postedBy(parent, args, context) {
    return context.prisma.comment({ id: parent.id }).postedBy()
}

function link(parent, args, context) {
    return context.prisma.comment({ id: parent.id }).link()
}

  module.exports = {
    postedBy,
    link,
  }