function user(parent, args, context) {
    return context.prisma.picture({ id: parent.id }).user()
  }
  
  module.exports = {
    user,
  }
  