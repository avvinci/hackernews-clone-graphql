function links(parent, args, context) {
  return context.prisma.user({ id: parent.id }).links()
}

function comments(parent, args, context) {
  return context.prisma.user({ id: parent.id }).comments()
}

function profilePic(parent, args, context) {
  return context.prisma.user({ id: parent.id }).profilePic()
}

module.exports = {
  links,
  comments,
  profilePic,
}
