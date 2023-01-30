const mongo = require('../node/mongo')

const User = require('./models/user')
const Item = require('./models/item')

const insertUser = async () => {
  const user = {
    name: '이승철',
    password: '1234'
  }

  const item = {
    id: 1,
    title: '아이폰',
    price: 1000
  }

  const new_use = new User(user)
  await new_use.save()

  const new_item = new Item(item)
  await new_item.save()

  // 이승철을 검색해서 items에 new_item을 넣는다.
  const before = await User.findOne({ name: '이승철' })
  before.items.push(new_item)
  await before.save()


  const after = await User.findOne({ name: '이승철' })
  console.log(after)
  const findItem = await Item.findOne({ _id: after.items[0] })
  console.log(findItem)


}

insertUser()
