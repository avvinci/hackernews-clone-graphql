function postedBy(parent, args, context) {
  return context.prisma.link({ id: parent.id }).postedBy()
}

function votes(parent, args, context) {
  return context.prisma.link({ id: parent.id }).votes()
}


function comments(parent, args, context) {
  return context.prisma.link({ id: parent.id }).comments()
}

module.exports = {
  postedBy,
  votes,
  comments,
}