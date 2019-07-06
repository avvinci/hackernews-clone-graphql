const { getUserId } = require('../utils')

async function user(parent,args,context){
  const userId = getUserId(context)
  return context.prisma.user({
    id: userId,
  })
}

async function linksByUser(parent,args,context){
  const userId = getUserId(context)
  return context.prisma.user({
    id: userId,
  }).links()
}

async function commentsOnLink(parent , args, context) {
    return context.prisma.link({
      id: args.linkId,
    }).comments()
}



async function commentsByUser(parent,args,context){
  const userId = getUserId(context)
  return context.prisma.user({
    id: userId,
  }).comments()
}

async function comments(parent,args,context){
  return context.prisma.comments()
}
async function upvotedLinksByUser(parent,args,context){
  const userId = getUserId(context)
  return context.prisma.user({
    id: userId,
  }).votes()
}

async function feed(parent, args, context) {
  const count = await context.prisma
    .linksConnection({
      where: {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter },
        ],
      },
    })
    .aggregate()
    .count()
  const links = await context.prisma.links({
    where: {
      OR: [
        { description_contains: args.filter },
        { url_contains: args.filter },
      ],
    },
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  })
  return {
    count,
    links,
  }
}

module.exports = {
  feed,
  user,
  linksByUser,
  upvotedLinksByUser,
  commentsByUser,
  commentsOnLink,
  comments,
}
