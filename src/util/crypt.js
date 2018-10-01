import bcrypt from 'bcryptjs';

const hash = (item) => bcrypt.hashSync(item,10);
const compare = async (password,hash) => await bcrypt.compare(password, hash)

export default {
  hash,
  compare,
}