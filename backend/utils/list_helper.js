const dummy = (blogs) => {
  return blogs
}


const totalLikes = (o) => {
  let all = o.map(a => a.likes)
  // console.log('func of all is: ' ,all)

  const reducer = (sum, item) => {
    return sum + item
  }
  // returnd as array -> [5]
  // use reduce to give value back without being in array
  const endRes = all.reduce(reducer, 0) / all.length


  //returned only as num -> 5
  return endRes
}



allBlogs = (o) => {
  let all = o.map(every => every.likes)
  // console.log('func of allBlogs all: ',all)

  const reducer = (sum, item) => {
    return sum + item
  }

  const endRes = all.reduce(reducer, 0)

  // console.log('func of allBlogs endRes: ',endRes)

  return endRes
}

module.exports = {
  dummy,
  totalLikes, allBlogs
}